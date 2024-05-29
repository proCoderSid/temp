import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { ClientComponent } from 'src/app/master/client/client.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-saving-debit-transfer',
  templateUrl: './saving-debit-transfer.component.html',
  styleUrls: ['./saving-debit-transfer.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class SavingDebitTransferComponent {
  selectedId: any = {};
  loadMainForm = false;
  addNewDebitCashForm!: FormGroup;
  voucherData: any;
  instrumentData: any;
  instrumentDisplayArray: [] = [];
  creditAccountDetails: any;
  creditAccountData: any;
  creditGLAccId: number = 0;
  closingAmountDisplay: number = 0;
  GLAccountData = [];
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}
  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'SAVING-DEBIT-TRANSFER' }]);
    this.ds.setPageTitle('SAVING-DEBIT-TRANSFER');
    this.getVoucherData(1);
    this.createAddNewDebitCashForm();
  }
  createAddNewDebitCashForm() {
    this.addNewDebitCashForm = this._fb.group({
      date1: new FormControl(null),
      dr_amount: new FormControl(null),
      instrument_id: new FormControl(null),
      gl_account_id: new FormControl(null),
      instrument_number: new FormControl(null),
      cheque_number: new FormControl(null),
      cheque_date: new FormControl(null),
      voucher_number: new FormControl(null),
      remarks: new FormControl(null)
    });
  }
  clientSelected(data: any) {
    if (data && data.id) {
      this.selectedId = data.id;
      this.createAddNewDebitCashForm();
      this.loadMainForm = true;
      this.creditAccountDetails = data;
      this.api.get(ApiRoutes.savingAccountDataMaster, {}, data.id).subscribe((response) => {
        this.creditAccountData = response.payload.data[0];
        this.api.get(ApiRoutes.savingProductData, {}, this.creditAccountData.product_id).subscribe((response) => {
          let savProductData = response.payload.data;
          if (savProductData.GLAccounts.length > 0) {
            this.creditGLAccId = savProductData.GLAccounts[0].id1;
          }
        });
      });
    } else {
      this.loadMainForm = false;
    }
  }
  getVoucherData(id: number) {
    this.api.get(ApiRoutes.userVoucherData, { vouName: 'savings_debit_transfer' }, 0).subscribe((response) => {
      this.voucherData = response.payload.data[0];
      this.getInstrumentData();
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
  instrumentChanged(id: any) {
    this.addNewDebitCashForm.get('gl_account_id')?.setValue(null);
    if (id === 6) {
      this.api.get(ApiRoutes.GlAccMasterData, {}, 0, { id: 39 }).subscribe((response) => {
        this.GLAccountData = [];
        this.GLAccountData = response.payload.data;
        console.log(this.GLAccountData);
      });
    }
    if (id === 10) {
      this.api
        .get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' })
        .subscribe((response) => {
          this.GLAccountData = [];
          this.GLAccountData = response.payload.data;
        });
    }
  }
  closingAmount(target: any) {
    let value = target.value ? target.value : 0;
    this.closingAmountDisplay = Number(value) + Number(this.creditAccountData.account_balance_derived);
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);
  }
}
