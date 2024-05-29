import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { ClientComponent } from 'src/app/master/client/client.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-saving-credit-cash',
  templateUrl: './saving-credit-cash.component.html',
  styleUrls: ['./saving-credit-cash.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class SavingCreditCashComponent {
  selectedId: any = {};
  voucherData: any;
  instrumentData: any;
  loadMainForm = false;
  showTable = false;
  editData: any = null;
  closingAmount: number = 0;
  instrumentDisplayArray: [] = [];
  GLAccountData = [];
  voucherNumberData: any;
  addNewCreditCashForm!: FormGroup;
  selectedVouNum: any;
  creditAccountDetails: any;
  creditAccountData: any;
  creditGLAccId: number = 0;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}
  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'SAVING-CREDIT-CASH' }]);
    this.ds.setPageTitle('SAVING-CREDIT-CASH');
    this.createAddNewCreditCashForm();
  }
  createAddNewCreditCashForm() {
    this.addNewCreditCashForm = this._fb.group({
      date1: new FormControl(null),
      cr_amount: new FormControl(null),
      instrument_id: new FormControl(null),
      gl_account_id: new FormControl(null),
      instrument_number: new FormControl(null),
      voucher_number: new FormControl(null),
      remarks: new FormControl(null)
    });
  }
  clientSelected(data: any) {
    if (data && data.id) {
      this.selectedId = data.id;
      this.getVoucherData();
      this.creditAccountDetails = data;
      this.api.get(ApiRoutes.savingAccountDataMaster, {}, data.id).subscribe((response) => {
        this.creditAccountData = response.payload.data[0];
        console.log(this.creditAccountData);
        this.api.get(ApiRoutes.savingProductData, {}, this.creditAccountData.product_id).subscribe((response) => {
          let savProductData = response.payload.data;
          if (savProductData.GLAccounts.length > 0) {
            this.creditGLAccId = savProductData.GLAccounts[0].id1;
          }
        });
      });
      this.createAddNewCreditCashForm();
      this.loadMainForm = true;
    } else {
      this.loadMainForm = false;
    }
  }
  getVoucherData() {
    this.api.get(ApiRoutes.userVoucherData, { vouName: 'savings_credit_cash' }, 0).subscribe((response) => {
      this.voucherData = response.payload.data[0];
      console.log(this.voucherData);
      if (this.voucherData.add_grant === 1) {
        this.getInstrumentData();
        this.getNumberPreference();
        this.getGLAccount();
      }
    });
  }
  getInstrumentData() {
    this.api.get(ApiRoutes.InstrumentData, { page: 1, size: 500 }).subscribe((response) => {
      this.instrumentData = response.payload.data;
      let instrumentIdArray = this.voucherData.instrument_data.split(',');
      for (let i = 0; i < instrumentIdArray.length; i++) {
        let tempArray: [] = this.instrumentData.filter((j: any) => j.id === Number(instrumentIdArray[i]));
        if (tempArray.length > 0) {
          this.instrumentDisplayArray = [...this.instrumentDisplayArray, ...tempArray];
        }
      }
    });
  }
  getNumberPreference() {
    this.api.post(ApiRoutes.checkNumber, { vouID: this.voucherData.voucher_id }).subscribe((response) => {
      this.voucherNumberData = response.payload.data;
      if (this.voucherNumberData.length === 1) {
        if (this.voucherNumberData[0].NumType === 1 || 3) {
          this.selectedVouNum = this.voucherNumberData[0];
          console.log(this.selectedVouNum);
        }
      } else {
        this.showTable = true;
      }
    });
  }
  getGLAccount() {
    this.api.get(ApiRoutes.GlAccMasterData, {}, 0, { id: 44 }).subscribe((response) => {
      this.GLAccountData = response.payload.data;
    });
  }
  validateAmount(target: any) {
    let value = target.value !== undefined ? target.value : target;
    this.closingAmount = Number(value) + Number(this.creditAccountData.account_balance_derived);
  }

  onSubmit(form: FormGroup) {
    console.log(form.value);
    if (!this.addNewCreditCashForm.valid) {
      this.api.post(ApiRoutes.SavingsTransection, this.addNewCreditCashForm.value).subscribe((res) => {
        console.log('response', res);
      });
    }
  }
}
