import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { BASE, FrequencyList, StatusList, chargePaymentBy, glAccountType } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-charge',
  templateUrl: './add-charge.component.html',
  styleUrls: ['./add-charge.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddChargeComponent implements OnInit {
  mode: 'Add' | 'Edit' = 'Add';
  addNewChargeForm!: FormGroup;
  isSystem: string[] = [
    'charge_applies_to',
    'charge_name',
    'charge_time',
    'charge_calculation',
    'amount',
    'charge_payment_by',
    'is_frequency',
    'charge_frequency',
    'charge_interval',
    'charge_interval',
    'due_date',
    'charge_on_day',
    'charge_on_month',
    'charge_gl_type',
    'gl_account_id',
    'is_penalty',
    'is_locked'
  ];

  chargeData!: any;
  StatusList = StatusList;
  chargeDataType: any;
  glAccount!: any;
  chargeFrequency = FrequencyList;
  simplifiedGLAccount!: any;
  glAccountType = glAccountType;
  chargePaymentBy = chargePaymentBy;
  chargeTimeType: any;
  chargeCalculationType: any;
  newLabelName: any = {};
  oldLabelName: any = {};

  chargeLanguageLabel!: any;
  currentLang: any = null;
  chargeLanguage!: any;
  chargeLanguageLabels: any = [];

  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.chargeData = this.config.data ? this.config.data : null;
    console.log(this.config.data);

    this.getChargeType();
    this.getGLAccounts();
    this.createAddNewChargeForm();
  }

  getChargeType() {
    this.api.get(ApiRoutes.chargeType, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.chargeDataType = res.payload.data;
      console.log(this.chargeDataType);

      if (this.chargeData) {
        let tempData = this.chargeDataType.filter((i: any) => i['id'] === this.chargeData['charge_applies_to'].toString());
        this.chargeTimeType = tempData[0]['chargeTimeType'];
        console.log(this.chargeTimeType);
        this.chargeCalculationType = tempData[0]['chargeCalculationType'];
      }
    });
  }
  product(value: any) {
    const selectedProduct = this.chargeDataType.find((product: any) => product.id === value.value);

    if (selectedProduct) {
      this.addNewChargeForm.get('charge_time')?.setValue(null);
      this.addNewChargeForm.get('charge_calculation')?.setValue(null);
      this.chargeTimeType = selectedProduct.chargeTimeType;
      this.chargeCalculationType = selectedProduct.chargeCalculationType;

      if (selectedProduct.id === '1007') {
        this.addNewChargeForm.get('charge_payment_by')?.setValidators(Validators.required);
        this.addNewChargeForm.get('charge_payment_by')?.updateValueAndValidity();
      } else {
        this.addNewChargeForm.get('charge_payment_by')?.setValidators([]);
        this.addNewChargeForm.get('charge_payment_by')?.updateValueAndValidity();
      }
    }
  }
  getGLAccounts() {
    this.api
      .get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' })
      .subscribe((response) => {
        this.glAccount = response.payload.data;
        if (this.chargeData) {
          this.glAccTypeChange(this.chargeData['charge_gl_type'], 'No');
        }
      });
  }
  glAccTypeChange(value: any, blanking: string) {
    console.log(value);

    if (blanking === 'Yes') {
      this.addNewChargeForm.get('gl_account_id')?.setValue(null);
      this.addNewChargeForm.get('gl_account_id')?.updateValueAndValidity();
    }
    if (value === 0 && this.glAccount) {
      this.simplifiedGLAccount = this.glAccount;
      console.log(this.simplifiedGLAccount);
    }
    if (value === 1 && this.glAccount) {
      this.simplifiedGLAccount = this.glAccount.filter((i: any) => i.group_short_id === 'SHR');
    }
    if (value === 2 && this.glAccount) {
      this.simplifiedGLAccount = this.glAccount.filter((i: any) => i.group_short_id === 'SAVI');
    }
  }
  createAddNewChargeForm() {
    this.addNewChargeForm = new FormGroup({
      charge_applies_to: new FormControl(this.chargeData ? this.chargeData['charge_applies_to'].toString() : null, Validators.required),
      charge_name: new FormControl(null, [Validators.required]),
      in_native: new FormControl(null),
      charge_time: new FormControl(null),
      charge_calculation: new FormControl(null),
      amount: new FormControl(null, [Validators.required]),
      charge_payment_by: new FormControl(0),
      is_frequency: new FormControl(0),
      charge_frequency: new FormControl(0),
      charge_interval: new FormControl(0),
      due_date: new FormControl(null),
      charge_on_day: new FormControl(0),
      charge_on_month: new FormControl(0),
      charge_gl_type: new FormControl(null, Validators.required),
      gl_account_id: new FormControl(null, Validators.required),
      is_penalty: new FormControl(0, Validators.required),
      is_deactivated: new FormControl(0, Validators.required),
      is_locked: new FormControl(0, Validators.required)
    });

    if (this.config.data) {
      this.addNewChargeForm.patchValue(this.config.data);

      this.mode = 'Edit';
    }
  }
  @Debounce(300)
  onSubmit() {
    if (!this.addNewChargeForm.valid) {
      return;
    }
    let date = new Date(this.addNewChargeForm.value['due_date']);
    this.addNewChargeForm.value['charge_on_day'] = this.addNewChargeForm.value['due_date'] !== null ? date.getDate() : null;
    this.addNewChargeForm.value['charge_on_month'] = this.addNewChargeForm.value['due_date'] !== null ? date.getMonth() + 1 : null;

    const body = {
      charge_applies_to: this.addNewChargeForm.value.charge_applies_to,
      charge_name: this.addNewChargeForm.value.charge_name,
      in_native: this.addNewChargeForm.value.in_native,
      charge_time: this.addNewChargeForm.value.charge_time,
      charge_calculation: this.addNewChargeForm.value.charge_calculation,
      amount: this.addNewChargeForm.value.amount,
      charge_payment_by: this.addNewChargeForm.value.charge_payment_by,
      is_frequency: this.addNewChargeForm.value.is_frequency,
      charge_frequency: this.addNewChargeForm.value.charge_frequency,
      charge_interval: this.addNewChargeForm.value.charge_interval,
      due_date: this.addNewChargeForm.value.due_date,
      charge_on_day: this.addNewChargeForm.value.charge_on_day,
      charge_on_month: this.addNewChargeForm.value.charge_on_month,
      charge_gl_type: this.addNewChargeForm.value.charge_gl_type,
      gl_account_id: this.addNewChargeForm.value.gl_account_id,
      is_penalty: this.addNewChargeForm.value.is_penalty,
      is_deactivated: this.addNewChargeForm.value.is_deactivated,
      is_locked: this.addNewChargeForm.value.is_locked,
      vouName: 'charge_entry',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.chargeMaster, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      for (let index = 0; index < this.isSystem.length; index++) {
        const element = this.isSystem[index];
        if (this.addNewChargeForm.controls[element].disabled) {
          this.addNewChargeForm.value[element] = this.chargeData[element];
        }
      }
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.addNewChargeForm.value).forEach((i: any) => {
        if (this.addNewChargeForm.value[i] != this.chargeData[i] && i !== 'is_frequency') {
          if (i == 'charge_interval') {
            let j = i;
            let k = this.addNewChargeForm.value['charge_time'] == 9 ? i + '_1' : i + '_2';
            NewValueObj[this.getLabelLanguage(k)] = this.newLabelName[j] ? this.newLabelName[j] : this.addNewChargeForm.value[j];
            OldValueObj[this.getLabelLanguage(k)] = this.oldLabelName[j] ? this.oldLabelName[j] : this.chargeData[j];
            UpdateValueObj[j] = this.addNewChargeForm.value[j];
          }
          if (i !== 'charge_on_day' && i !== 'charge_on_month' && i !== 'charge_interval') {
            NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.addNewChargeForm.value[i];
            OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.chargeData[i];
          }
          if (i !== 'due_date' && i !== 'charge_interval') {
            UpdateValueObj[i] = this.addNewChargeForm.value[i];
          }
        }
      });
      NewValueObj['vouName'] = this.addNewChargeForm.value['vouName'] || 'charge_entry';
      UpdateValueObj['vouName'] = this.addNewChargeForm.value['vouName'] || 'charge_entry';
      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      let finalForm = { ...updatesObj, ...body };
      delete finalForm?.id;
      console.log(finalForm);

      this.api.put(ApiRoutes.chargeMaster, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }

  getJSON() {
    this.api.getJson('assets/json/charge-type-language.json').subscribe((data) => {
      this.chargeLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.chargeLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.chargeLanguageLabels = Object.keys(this.chargeLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    if (this.chargeLanguage?.[this.currentLang] && this.chargeLanguage?.[this.currentLang][label]) {
      return this.chargeLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
