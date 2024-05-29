import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import {
  AccountingTypeList,
  CsSavingWithdrawalList,
  DaysInMonthYearList,
  FrequencyList,
  InterestCalculationPeriodList,
  PreMaturePenalInterestList,
  RDInterestCalculationUsing,
  SavingsProductTypeList,
  StatusList
} from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-savings-product',
  templateUrl: './add-savings-product.component.html',
  styleUrls: ['./add-savings-product.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddSavingsProductComponent {
  addNewSavingsProductForm!: FormGroup;
  savingsProductData!: any;
  chargeData!: any;
  chargeDataType!: any;
  obj: any = { is_deleted: 0 };
  tableObj!: any;
  glAccount: any = [];
  changedDate: any = 2;
  showTable101 = false;
  showTable102 = false;
  showTable110 = false;
  showTable105 = false;
  charge101: any = [];
  charge102: any = [];
  charge110: any = [];
  charge105: any = [];
  savingsProductId!: number;
  tempChargesDelete: any = [];
  yesNoList = StatusList;
  frequencyList = FrequencyList;
  interestCompoundingPeriod = InterestCalculationPeriodList;
  interestPostingPeriod = InterestCalculationPeriodList.filter((i: any) => i.value !== 1 && i.value !== 6);
  csSavingPeriod = [{ label: 'Weeks', value: 1 }].concat(this.interestPostingPeriod);
  RDInterestCalculationUsing = RDInterestCalculationUsing;
  identificationList: Array<any> = [];
  DaysInMonthYear = DaysInMonthYearList;
  identificationRowIndex?: number = undefined;
  csSavingWithdrawal = CsSavingWithdrawalList;
  preMaturePenalInterest = PreMaturePenalInterestList;
  accountingType = AccountingTypeList;
  accountingTypeList = AccountingTypeList.filter((i: any) => i.value !== 2);
  GLAccountData: any[] = [];
  savingsProductType = SavingsProductTypeList;

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private _sharedService: SharedService
  ) {}
  ngOnInit() {
    this.savingsProductId = this._sharedService.getSavingsProductId();
    this.getGlData();
    this.chargeList();
    this.createAddSavingsProductInformationForm();
  }
  createAddSavingsProductInformationForm() {
    this.addNewSavingsProductForm = this._fb.group({
      //details
      product_name: new FormControl(this.savingsProductData ? this.savingsProductData.product_name : null, [Validators.required]),
      in_native: new FormControl(this.savingsProductData ? this.savingsProductData.in_native : null),
      short_name: new FormControl(this.savingsProductData ? this.savingsProductData.short_name : null, [Validators.required]),
      start_date: new FormControl(this.savingsProductData ? this.savingsProductData.start_date : null),
      close_date: new FormControl(this.savingsProductData ? this.savingsProductData.close_date : null),
      description: new FormControl(this.savingsProductData ? this.savingsProductData.description : null),
      is_deactivated: new FormControl(this.savingsProductData ? this.savingsProductData.is_deactivated : 1),

      //tearms
      annual_interest_rate: new FormControl(this.savingsProductData ? this.savingsProductData.annual_interest_rate : null, [
        Validators.required
      ]),

      interest_compounding_period: new FormControl(this.savingsProductData ? this.savingsProductData.interest_compounding_period : 1),
      interest_posting_period: new FormControl(this.savingsProductData ? this.savingsProductData.interest_posting_period : 2),
      interest_calculation_using: new FormControl(this.savingsProductData ? this.savingsProductData.interest_calculation_using : 3),
      interest_calculation_days_in_year: new FormControl(
        this.savingsProductData ? this.savingsProductData.interest_calculation_days_in_year : 0
      ),
      min_days_to_start: new FormControl(this.savingsProductData ? this.savingsProductData.min_days_to_start : null),
      product_type: new FormControl(this.savingsProductData ? this.savingsProductData.product_type : null),
      cs_withdrawal_policy: new FormControl(this.savingsProductData ? this.savingsProductData.cs_withdrawal_policy : 0),
      cs_amount: new FormControl(this.savingsProductData ? this.savingsProductData.cs_amount : null),
      cs_amount_period: new FormControl(this.savingsProductData ? this.savingsProductData.cs_amount_period : 1),

      //settings
      min_required_opening_balance: new FormControl(this.savingsProductData ? this.savingsProductData.min_required_opening_balance : null, [
        Validators.required
      ]),
      lockin_period_frequency: new FormControl(this.savingsProductData ? this.savingsProductData.lockin_period_frequency : null, [
        Validators.required
      ]),
      lockin_period_frequency_type: new FormControl(this.savingsProductData ? this.savingsProductData.lockin_period_frequency_type : 1),
      apply_withdrawal_fee_for_transfer: new FormControl(
        this.savingsProductData ? this.savingsProductData.apply_withdrawal_fee_for_transfer : 1
      ),
      enforce_min_required_balance: new FormControl(this.savingsProductData ? this.savingsProductData.enforce_min_required_balance : 1),
      min_required_balance: new FormControl(this.savingsProductData ? this.savingsProductData.min_required_balance : null),
      min_balance_for_interest_calculation: new FormControl(
        this.savingsProductData ? this.savingsProductData.min_balance_for_interest_calculation : null
      ),
      allow_overdraft: new FormControl(this.savingsProductData ? this.savingsProductData.allow_overdraft : 1),
      overdraft_limit: new FormControl(this.savingsProductData ? this.savingsProductData.overdraft_limit : null),
      annual_interest_rate_overdraft: new FormControl(
        this.savingsProductData ? this.savingsProductData.annual_interest_rate_overdraft : null
      ),
      min_overdraft_for_interest_calculation: new FormControl(
        this.savingsProductData ? this.savingsProductData.min_overdraft_for_interest_calculation : null
      ),
      apply_tds: new FormControl(this.savingsProductData ? this.savingsProductData.apply_tds : 1),
      tds_gl_account_id: new FormControl(this.savingsProductData ? this.savingsProductData.tds_gl_account_id : null),
      allow_dormancy_tracking: new FormControl(this.savingsProductData ? this.savingsProductData.allow_dormancy_tracking : 1),
      days_to_inactive: new FormControl(this.savingsProductData ? this.savingsProductData.days_to_inactive : null),
      days_to_dormancy: new FormControl(this.savingsProductData ? this.savingsProductData.days_to_dormancy : null),
      days_to_escheat: new FormControl(this.savingsProductData ? this.savingsProductData.days_to_escheat : null),

      // Charges
      Charges: new FormArray([]),

      //accounting
      accounting_type: new FormControl(this.savingsProductData ? this.savingsProductData.accounting_type : 0),
      GLAccounts: this._fb.array([]),
      id1: new FormControl(
        this.savingsProductData ? (this.savingsProductData.GLAccounts[0] ? this.savingsProductData.GLAccounts[0]['id1'] : null) : null
      ),
      id2: new FormControl(
        this.savingsProductData ? (this.savingsProductData.GLAccounts[1] ? this.savingsProductData.GLAccounts[1]['id2'] : null) : null
      ),
      id3: new FormControl(
        this.savingsProductData ? (this.savingsProductData.GLAccounts[2] ? this.savingsProductData.GLAccounts[2]['id3'] : null) : null
      ),
      id4: new FormControl(
        this.savingsProductData ? (this.savingsProductData.GLAccounts[3] ? this.savingsProductData.GLAccounts[3]['id4'] : null) : null
      ),
      id5: new FormControl(
        this.savingsProductData ? (this.savingsProductData.GLAccounts[4] ? this.savingsProductData.GLAccounts[4]['id5'] : null) : null
      ),
      id6: new FormControl(
        this.savingsProductData ? (this.savingsProductData.GLAccounts[5] ? this.savingsProductData.GLAccounts[5]['id6'] : null) : null
      )
    });
  }
  getGlData() {
    this.api.get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' }).subscribe((res) => {
      this.GLAccountData = res.payload.data;
    });
  }
  chargeList() {
    this.api.get(ApiRoutes.chargeMaster, { page: 0, size: 500 }, 0, this.obj).subscribe((response) => {
      this.chargeData = response.payload.data;
      this.getChargeType();
    });
  }
  getChargeType() {
    this.api.get(ApiRoutes.chargeType, {}).subscribe((response) => {
      this.chargeDataType = response.payload.data;
      for (let j = 0; j < this.chargeData.length; j++) {
        let tempArray = this.chargeDataType.filter((i: any) => i.id === this.chargeData[j].charge_applies_to.toString());
        let chargeCalObj = tempArray[0].chargeCalculationType.filter((i: any) => i.id === this.chargeData[j].charge_calculation.toString());
        this.chargeData[j].charge_calculation_type = chargeCalObj[0].value;
      }
      if (Number(this.savingsProductId) > 0) {
        this.getSavingsProductData(this.savingsProductId);
      }
    });
  }
  getSavingsProductData(id: any) {
    this.api.get(ApiRoutes.savingProductData, {}, id).subscribe((response) => {
      this.savingsProductData = response.payload.data;
      if (this.savingsProductData.Charges.length > 0) {
        this.chargeTables();
      }
      this.createAddSavingsProductInformationForm();
      this._sharedService.setSavingsProductId(0);
    });
  }
  chargeTables() {
    const tempCharges = this.savingsProductData.Charges;
    for (let j = 0; j < tempCharges.length; j++) {
      const tempArray = this.chargeData.filter((i: any) => i.id === tempCharges[j].charge_id);
      tempCharges[j].charge_name = tempArray[0].charge_name;
      tempCharges[j].amount = tempArray[0].amount;
      tempCharges[j].charge_calculation_type = tempArray[0].charge_calculation_type;
      if (tempCharges[j].id === 101) {
        this.charge101.push(tempCharges[j]);
        this.showTable101 = true;
      }
      if (tempCharges[j].id === 102) {
        this.charge102.push(tempCharges[j]);
        this.showTable102 = true;
      }
      if (tempCharges[j].id === 110) {
        this.charge110.push(tempCharges[j]);
        this.showTable110 = true;
      }
      if (tempCharges[j].id === 105) {
        this.charge105.push(tempCharges[j]);
        this.showTable105 = true;
      }
    }
  }
  selectedCharge(event: any) {
    const selectedCharge = this.chargeData.find((charge: any) => charge.id === event.value);
    if (selectedCharge) {
      this.tableObj = {
        charge_name: selectedCharge.charge_name,
        charge_id: selectedCharge.id,
        charge_calculation_type: selectedCharge.charge_calculation_type,
        amount: selectedCharge.amount
      };
    }
  }
  addCharge(id: number, arrayName: string) {
    if (this.tableObj !== undefined) {
      this.tableObj.id = id;
      const chargeArrays: { [key: number]: any[] } = {
        101: this.charge101,
        102: this.charge102,
        110: this.charge110,
        105: this.charge105
      };
      const currentChargeArray = chargeArrays[id];
      if (currentChargeArray.find((i: any) => i.charge_id === this.tableObj.charge_id) === undefined) {
        currentChargeArray.push(this.tableObj);
        (this as any)[`showTable${id}`] = true;
      }
    }
  }
  onDelete(id: number, index: number, charge: any) {
    if (this.savingsProductId > 0) {
      this.tempChargesDelete.push({});
    }
    const chargeArrays: { [key: number]: any[] } = {
      101: this.charge101,
      102: this.charge102,
      110: this.charge110,
      105: this.charge105
    };
    const currentChargeArray = chargeArrays[id];
    currentChargeArray.splice(index, 1);
    const showTableProperty = `showTable${id}`;
    if (currentChargeArray.length < 1) {
      (this as any)[showTableProperty] = false;
    }
  }
  addOrderPosition() {
    for (let i = 0; i < this.charge101.length; i++) {
      this.charge101[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge102.length; i++) {
      this.charge102[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge110.length; i++) {
      this.charge110[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge105.length; i++) {
      this.charge105[i].order_position = i + 1;
    }
  }
  onSubmit() {
    this.addNewSavingsProductForm.value['vouName'] = 'savings_product';
    this.addOrderPosition();
    this.addNewSavingsProductForm.value['Charges'] = this.charge101.concat(this.charge102, this.charge105, this.charge110);
    if (this.addNewSavingsProductForm.value['accounting_type'] === 1) {
      let tempArray = [
        { id1: this.addNewSavingsProductForm.value['id1'] },
        { id2: this.addNewSavingsProductForm.value['id2'] },
        { id3: this.addNewSavingsProductForm.value['id3'] },
        { id4: this.addNewSavingsProductForm.value['id4'] },
        { id5: this.addNewSavingsProductForm.value['id5'] },
        { id5: this.addNewSavingsProductForm.value['id5'] },
        { id6: this.addNewSavingsProductForm.value['id6'] }
      ];
      this.addNewSavingsProductForm.value['GLAccounts'] = tempArray;
    }
    if (this.addNewSavingsProductForm.valid) {
      if (this.savingsProductData && this.savingsProductData.id) {
        this.addNewSavingsProductForm.value['EType'] = 'Edit';
        this.api
          .put(ApiRoutes.savingProductData, this.savingsProductData['id'], this.addNewSavingsProductForm.value)
          .subscribe((response) => {
            if (response) {
              this._sharedService.setSavingsProductId(0);
            }
          });
      } else {
        this.addNewSavingsProductForm.value['EType'] = 'Add';
        this.api.post(ApiRoutes.savingProductData, this.addNewSavingsProductForm.value).subscribe((res) => {
          console.log('response', res);
        });
      }
    }
  }
}
