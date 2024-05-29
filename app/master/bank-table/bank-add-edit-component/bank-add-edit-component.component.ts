import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-bank-add-edit-component',
  templateUrl: './bank-add-edit-component.component.html',
  styleUrls: ['./bank-add-edit-component.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class BankAddEditComponentComponent {
  mode: 'Add' | 'Edit' = 'Add';
  bankFormGroup!: FormGroup;
  newLabelName: any = {};
  oldLabelName: any = {};
  bankData: any;

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

  ngOnInit() {
    this.bankData = this.config ? this.config.data : null;
    this.bankFormGroup = new FormGroup({
      bank_name: new FormControl('', Validators.required),
      is_deactivated: new FormControl(0),
      is_locked: new FormControl(1)
    });

    if (!!this.config.data) {
      this.bankFormGroup.patchValue(this.config.data);
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
  }

  @Debounce(300)
  onSubmit() {
    if (!this.bankFormGroup.valid) {
      return;
    }

    const body = {
      bank_name: this.bankFormGroup.value.bank_name,
      is_deactivated: this.bankFormGroup.value.is_deactivated,
      is_locked: this.bankFormGroup.value.is_locked,
      vouName: 'bank_entry',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };
    console.log(body);

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.bankMaster, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.bankFormGroup.value).forEach((i: any) => {
        if (this.bankFormGroup.value[i] !== this.bankData[i]) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.bankFormGroup.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.bankData[i];
          UpdateValueObj[i] = this.bankFormGroup.value[i];
        }
      });
      NewValueObj['vouName'] = this.bankFormGroup.value['vouName'] || 'bank_entry';
      UpdateValueObj['vouName'] = this.bankFormGroup.value['vouName'] || 'bank_entry';

      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      let finalForm = { ...updatesObj, ...body };
      delete finalForm?.id;
      console.log(finalForm);
      this.api.put(ApiRoutes.bankMaster, body.id, finalForm).subscribe((res) => {
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
      console.log(data);

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
