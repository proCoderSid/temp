import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { AccountTypeForAddAccount, AddAccountPrefixTypeList, BASE, LengthList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { AppTable } from 'src/app/core/models/table.model';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-account-number',
  templateUrl: './add-account-number.component.html',
  styleUrls: ['./add-account-number.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddAccountNumberComponent {
  mode: 'Add' | 'Edit' = 'Add';
  AccountForm!: FormGroup;
  statusList = AddAccountPrefixTypeList;
  account_typeList = AccountTypeForAddAccount;
  lengthList = LengthList;
  pager = new AppTable();
  accDataList!: any;
  accNumberData: any;

  proTypeList: any[] = [];
  districtList: any[] = [];
  newLabelName: any = {};
  oldLabelName: any = {};

  accNumberLanguageLabel: any;
  currentLang: any = null;
  accNumberLanguage: any;
  accNumberLanguageLabels: any = [];

  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {
    this.getJSON();
  }

  ngOnInit() {
    console.log(this.config.data);

    this.accNumberData = this.config ? this.config.data : null;
    this.productList();
    this.createDistrictForm();
  }
  productList() {
    this.api.get(ApiRoutes.productTypeMaster, BASE.DEFAULT_SIZE_2000).subscribe((response) => {
      this.proTypeList = response.payload.data;
    });
  }
  createDistrictForm() {
    this.AccountForm = <FormGroup>new FormGroup({
      product_type_id: new FormControl(0, Validators.required),
      prefix_type: new FormControl(null),
      total_length: new FormControl(this.accNumberData ? this.accNumberData.total_length : null),
      account_type: new FormControl(0),
      number_start_from: new FormControl(null)
    });

    if (!!this.config.data) {
      console.log(this.config.data);
      this.AccountForm.patchValue(this.config.data);
      if (this.config.data.number_start_from > 0) {
        this.AccountForm.get('account_type')?.setValue(1);
      }
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
  }

  @Debounce(300)
  onSubmit() {
    if (!this.AccountForm.valid) {
      return;
    }

    const body = {
      product_type_id: this.AccountForm.value.product_type_id,
      prefix_type: this.AccountForm.value.prefix_type,
      total_length: this.AccountForm.value.total_length,
      account_type: this.AccountForm.value.account_type,
      number_start_from: this.AccountForm.value.number_start_from,

      vouName: 'account_number_format',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.accountNumberMaster, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.AccountForm.value).forEach((i: any) => {
        if (this.AccountForm.value[i] !== this.accNumberData[i]) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.AccountForm.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.accNumberData[i];
          if (i !== 'account_type') {
            UpdateValueObj[i] = this.AccountForm.value[i];
          }
        }
      });
      NewValueObj['vouName'] = this.AccountForm.value['vouName'] || 'account_number_format';
      UpdateValueObj['vouName'] = this.AccountForm.value['vouName'] || 'account_number_format';

      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      let finalForm = { ...updatesObj, ...body };
      console.log(finalForm);
      this.api.put(ApiRoutes.accountNumberMaster, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }
  getJSON() {
    this.api.getJson('assets/json/account-number-language.json').subscribe((data) => {
      this.accNumberLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.accNumberLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.accNumberLanguageLabels = Object.keys(this.accNumberLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    if (this.accNumberLanguage?.[this.currentLang] && this.accNumberLanguage?.[this.currentLang][label]) {
      return this.accNumberLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
