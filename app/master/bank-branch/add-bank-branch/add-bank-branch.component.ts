import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { InverseStatusList, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-bank-branch',
  templateUrl: './add-bank-branch.component.html',
  styleUrls: ['./add-bank-branch.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddBankBranchComponent {
  mode: 'Add' | 'Edit' = 'Add';
  addNewCodeForm!: FormGroup;
  bankBranchData: any;
  statusList = StatusList;
  inverseStatusList = InverseStatusList;
  newLabelName: any = {};
  oldLabelName: any = {};
  bankLanguageLabel: any;
  currentLang: any = null;
  bankLanguage: any;
  bankLanguageLabels: any = [];

  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {
    this.getJSON();
  }

  ngOnInit(): void {
    this.bankBranchData = this.config ? this.config.data : null;
    console.log(this.bankBranchData);
    this._sharedService.setbankId;
    this.createAddNewCodeForm();
  }

  createAddNewCodeForm() {
    console.log(this.config.data);
    this.addNewCodeForm = <FormGroup>new FormGroup({
      bank_id: new FormControl(this.bankBranchData && this.bankBranchData ? this.bankBranchData.id : this._sharedService.getbankId()),
      branch_name: new FormControl(null, [Validators.required]),
      bank_address: new FormControl(null),
      bank_ifsc: new FormControl(null),
      bank_iban: new FormControl(null),
      bank_swift: new FormControl(null),
      is_deactivated: new FormControl(null),
      is_locked: new FormControl(null)
    });

    if (this.config.data) {
      this.addNewCodeForm.patchValue(this.config.data);
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
  }

  @Debounce(300)
  onSubmit() {
    if (!this.addNewCodeForm.valid) {
      return;
    }
    const body = {
      bank_id: this.addNewCodeForm.value.bank_id,
      branch_name: this.addNewCodeForm.value.branch_name,
      bank_address: this.addNewCodeForm.value.bank_address,
      bank_ifsc: this.addNewCodeForm.value.bank_ifsc,
      bank_iban: this.addNewCodeForm.value.bank_iban,
      bank_swift: this.addNewCodeForm.value.bank_swift,
      is_deactivated: this.addNewCodeForm.value.is_deactivated,
      is_locked: this.addNewCodeForm.value.is_locked,
      vouName: 'bank_branch_entry',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.bankBranch, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.addNewCodeForm.value).forEach((i: any) => {
        if (this.addNewCodeForm.value[i] !== this.bankBranchData[i]) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.addNewCodeForm.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.bankBranchData[i];
          UpdateValueObj[i] = this.addNewCodeForm.value[i];
        }
      });
      NewValueObj['vouName'] = this.addNewCodeForm.value['vouName'] || 'bank_branch_entry';
      UpdateValueObj['vouName'] = this.addNewCodeForm.value['vouName'] || 'bank_branch_entry';
      NewValueObj['EType'] = this.addNewCodeForm.value['EType'] || 'Edit';
      UpdateValueObj['EType'] = this.addNewCodeForm.value['EType'] || 'Edit';

      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      const { id, ...bodyWithoutId } = body;
      let finalForm = { ...updatesObj, ...bodyWithoutId };
      this.api.put(ApiRoutes.bankBranch, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }
  getJSON() {
    this.api.getJson('assets/json/bank-language.json').subscribe((data) => {
      this.bankLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.bankLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.bankLanguageLabels = Object.keys(this.bankLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    if (this.bankLanguage?.[this.currentLang] && this.bankLanguage?.[this.currentLang][label]) {
      return this.bankLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
