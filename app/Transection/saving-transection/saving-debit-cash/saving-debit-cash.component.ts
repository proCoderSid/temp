import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { ClientComponent } from 'src/app/master/client/client.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-saving-debit-cash',
  templateUrl: './saving-debit-cash.component.html',
  styleUrls: ['./saving-debit-cash.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class SavingDebitCashComponent {
  GLAccountData = [];
  selectedId: any = {};
  voucherData: any;
  loadMainForm = false;
  addNewDebitCashForm!: FormGroup;
  creditAccountDetails: any;
  creditAccountData: any;
  creditAccountDataForDisplay: any;
  creditGLAccId: number = 0;
  instrumentData: any;
  instrumentDisplayArray: [] = [];
  closingAmountDisplay: number = 0;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}
  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'SAVING-DEBIT-CASH' }]);
    this.ds.setPageTitle('SAVING-DEBIT-CASH');
    this.createAddNewDebitCashForm();
    this.getVoucherData(0);
  }
  getGLAccount() {
    this.api.get(ApiRoutes.GlAccMasterData, {}, 0, { id: 44 }).subscribe((response) => {
      this.GLAccountData = response.payload.data;
    });
  }
  clientSelected(data: any) {
    if (data && data.id) {
      this.selectedId = data.id;
      this.creditAccountDetails = data;
      this.api.get(ApiRoutes.savingAccountDataMaster, '', data.id).subscribe((response) => {
        this.creditAccountDataForDisplay = response.payload.data;
        this.creditAccountData = response.payload.data[0];
        this.api.get(ApiRoutes.savingProductData, {}, this.creditAccountData.product_id).subscribe((response) => {
          const savProductData = response.payload.data;
          if (savProductData.GLAccounts.length > 0) {
            this.creditGLAccId = savProductData.GLAccounts[0].id1;
          }
        });
      });
      this.loadMainForm = true;
    } else {
      this.loadMainForm = false;
    }
  }
  createAddNewDebitCashForm() {
    this.addNewDebitCashForm = this._fb.group({
      date1: new FormControl(null),
      dr_amount: new FormControl(null),
      instrument_id: new FormControl(1),
      instrument_number: new FormControl(null),
      gl_account_id: new FormControl(null),
      cheque_number: new FormControl(null),
      cheque_date: new FormControl(null),
      voucher_number: new FormControl(null),
      remarks: new FormControl(null)
    });
  }
  getVoucherData(id: number) {
    this.api.get(ApiRoutes.userVoucherData, { vouName: 'savings_debit_cash' }, 0).subscribe((response) => {
      this.voucherData = response.payload.data[0];
      this.getInstrumentData();
      this.getGLAccount();
    });
  }
  closingAmount(target: any) {
    let value = target.value ? target.value : 0;
    this.closingAmountDisplay = Number(value) + Number(this.creditAccountData.account_balance_derived);
  }
  transactionValidation(data: any, amount: number) {
    if (data.account_balance_derived > amount) {
      if (data.account_balance_derived - Number(amount) > data.total_amount_on_hold) {
        return 'valid';
      }
      if (data.enforce_min_required_balance === 1) {
        if (data.account_balance_derived - Number(amount) >= data.min_required_balance) {
          return 'valid';
        } else {
          return data.min_required_balance;
        }
      } else {
        return data.total_amount_on_hold;
      }
    } else {
      return data.account_balance_derived;
    }
  }
  getAmountCheck() {
    let status = this.transactionValidation(this.creditAccountData, this.addNewDebitCashForm.get('dr_amount')?.value);
    if (status !== 'valid') {
      this.addNewDebitCashForm.get('dr_amount')?.setValue(null);
      this.closingAmount(0);
    }
  }
  getInstrumentData() {
    this.api.get(ApiRoutes.InstrumentData, { page: 1, size: 500 }).subscribe((response) => {
      this.instrumentData = response.payload.data;
      const instrumentIdArray = this.voucherData.instrument_data.split(',');
      for (let i = 0; i < instrumentIdArray.length; i++) {
        let tempArray: [] = this.instrumentData.filter((j: any) => j.id === Number(instrumentIdArray[i]));
        if (tempArray.length > 0) {
          this.instrumentDisplayArray = [...this.instrumentDisplayArray, ...tempArray];
        }
      }
    });
  }
  onSubmit(form: FormGroup) {
    form.value['cheque_number'] =
      form.value['instrument_number'] !== null && undefined ? form.value['instrument_number'] : form.value['cheque_number'];
    form.value['account_number'] = this.creditAccountDetails.SAccNo;
    form.value['savings_account_id'] = this.creditAccountDetails.id;
    form.value['branch_id'] = this.creditAccountData.branch_id;
    form.value['vouName'] = this.voucherData.system_name;
    form.value['date1'] = moment(form.value['date1']).format('YYYY-MM-DD');
    form.value['cheque_date'] = form.value['cheque_date'] !== null ? moment(form.value['cheque_date']).format('YYYY-MM-DD') : null;
    form.value['cr_amount'] = 0;
    form.value['TRData'] = [
      {
        gl_account_id: this.creditGLAccId,
        account_name: this.creditAccountDetails.account_name,
        entity_type: 1003,
        entity_id: this.creditAccountDetails.id
      },
      {
        gl_account_id: this.GLAccountData.length > 0 && this.GLAccountData[0]['id'] > 0 ? this.GLAccountData[0]['id'] : null,
        account_name: this.GLAccountData.length > 0 ? this.GLAccountData[0]['account_name'] : null,
        entity_type: null,
        entity_id: null
      }
    ];
    console.log(form.value);
  }
}
