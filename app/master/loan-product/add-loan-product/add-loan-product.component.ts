import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import {
  AccountingTypeList,
  AmortizationMethodList,
  CompoundTypeList,
  CsSavingWithdrawalList,
  DaysInMonthYearList,
  FrequencyList,
  InterestCalculationPeriodList,
  InterestMethodList,
  LoanMonthCalculated,
  LoanProductTypeList,
  OverDueInterestList,
  PreMaturePenalInterestList,
  RDInterestCalculationUsing,
  RepayEveryList,
  RepaymentStrategyList,
  RescheduleStrategyList,
  StatusList
} from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-loan-product',
  templateUrl: './add-loan-product.component.html',
  styleUrls: ['./add-loan-product.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddLoanProductComponent {
  addNewLoanProductForm!: FormGroup;
  loanProductData!: any;
  mode: 'Add' | 'Edit' = 'Add';
  loanProductId!: number;
  yesNoList = StatusList;
  frequencyList = FrequencyList;
  interestMethod = InterestMethodList;
  interestProductCalculationMethod = InterestCalculationPeriodList.filter((i: any) => i.value === 1 || i.value === 2);
  interestCalculationPeriod = InterestCalculationPeriodList.filter((i: any) => i.value !== 6);
  interestCompoundingPeriod = InterestCalculationPeriodList;
  interestPostingPeriod = InterestCalculationPeriodList.filter((i: any) => i.value !== 1 && i.value !== 6);
  RDInterestCalculationUsing = RDInterestCalculationUsing;
  identificationList: Array<any> = [];
  DaysInMonthYear = DaysInMonthYearList;
  identificationRowIndex?: number = undefined;
  csSavingWithdrawal = CsSavingWithdrawalList;
  preMaturePenalInterest = PreMaturePenalInterestList;
  accountingType = AccountingTypeList;
  accountingTypeList = AccountingTypeList.filter((i: any) => i.value !== 2);
  GLAccountData: any[] = [];
  loanProductType = LoanProductTypeList;
  amortizationMethod = AmortizationMethodList;
  repaymentStrategy = RepaymentStrategyList;
  loanMonthCalculated = LoanMonthCalculated;
  compoundType = CompoundTypeList;
  rescheduleStrategy = RescheduleStrategyList;
  OverDueInterest = OverDueInterestList;
  overdueFrequency = FrequencyList;
  repayEvery = RepayEveryList;
  chargeData!: any;
  chargeDataType!: any;
  charge101: any = [];
  charge102: any = [];
  charge103: any = [];
  charge104: any = [];
  charge110: any = [];
  charge105: any = [];
  showTable101 = false;
  showTable102 = false;
  showTable103 = false;
  showTable104 = false;
  showTable110 = false;
  showTable105 = false;
  tempChargesDelete: any = [];
  tempChargesAdd: any = [];
  tableObj!: any;

  BaseDayForLoan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'LOAN-PRODUCT-MASTER' }]);
    this.ds.setPageTitle('LOAN-PRODUCT-MASTER');
    this.loanProductId = this._sharedService.getLoanProductId();
    if (this.loanProductId > 0) {
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
    this.getGlData();
    this.chargeList();
    this.createAddLoanProductInformationForm();
  }

  createAddLoanProductInformationForm() {
    this.addNewLoanProductForm = this._fb.group({
      //details
      product_name: new FormControl(this.loanProductData ? this.loanProductData.product_name : null, [Validators.required]),
      product_type: new FormControl(this.loanProductData ? this.loanProductData.product_type : null),
      in_native: new FormControl(this.loanProductData ? this.loanProductData.in_native : null),
      short_name: new FormControl(this.loanProductData ? this.loanProductData.short_name : null, [Validators.required]),
      start_date: new FormControl(this.loanProductData ? this.loanProductData.start_date : null),
      close_date: new FormControl(this.loanProductData ? this.loanProductData.close_date : null),
      description: new FormControl(this.loanProductData ? this.loanProductData.description : null),
      is_deactivated: new FormControl(this.loanProductData ? this.loanProductData.is_deactivated : null),

      //tearms
      loan_counter: new FormControl(this.loanProductData ? this.loanProductData.loan_counter : null),
      no_of_guarantor: new FormControl(this.loanProductData ? this.loanProductData.no_of_guarantor : null),
      allow_nominal_guarantor: new FormControl(this.loanProductData ? this.loanProductData.allow_nominal_guarantor : null),
      guarantor_counter: new FormControl(this.loanProductData ? this.loanProductData.guarantor_counter : null),
      hold_guarantor_funds: new FormControl(this.loanProductData ? this.loanProductData.hold_guarantor_funds : null),
      min_loan_amount: new FormControl(this.loanProductData ? this.loanProductData.min_loan_amount : null, [Validators.required]),
      default_loan_amount: new FormControl(this.loanProductData ? this.loanProductData.default_loan_amount : null, [Validators.required]),
      max_loan_amount: new FormControl(this.loanProductData ? this.loanProductData.max_loan_amount : null, [Validators.required]),
      min_repayments: new FormControl(this.loanProductData ? this.loanProductData.min_repayments : null, [Validators.required]),
      default_repayments: new FormControl(this.loanProductData ? this.loanProductData.default_repayments : null, [Validators.required]),
      max_repayments: new FormControl(this.loanProductData ? this.loanProductData.max_repayments : null, [Validators.required]),
      instalment_multiplesof: new FormControl(this.loanProductData ? this.loanProductData.instalment_multiplesof : null, [
        Validators.required
      ]),
      min_interest_rate: new FormControl(this.loanProductData ? this.loanProductData.min_interest_rate : null, [Validators.required]),
      default_interest_rate: new FormControl(this.loanProductData ? this.loanProductData.default_interest_rate : null, [
        Validators.required
      ]),
      max_interest_rate: new FormControl(this.loanProductData ? this.loanProductData.max_interest_rate : null, [Validators.required]),
      interest_period: new FormControl(this.loanProductData ? this.loanProductData.interest_period : 0),
      overdue_interest_rate: new FormControl(this.loanProductData ? this.loanProductData.overdue_interest_rate : null),
      overdue_interest_flat: new FormControl(this.loanProductData ? this.loanProductData.overdue_interest_flat : null),
      overdue_interest_when: new FormControl(this.loanProductData ? this.loanProductData.overdue_interest_when : 0),
      overdue_interest_on_amount: new FormControl(this.loanProductData ? this.loanProductData.overdue_interest_on_amount : 0),
      overdue_interest_start_from_days: new FormControl(
        this.loanProductData ? this.loanProductData.overdue_interest_start_from_days : null
      ),
      overdue_interest_start_from_months: new FormControl(
        this.loanProductData ? this.loanProductData.overdue_interest_start_from_months : null
      ),
      overdue_interest_frequency: new FormControl(this.loanProductData ? this.loanProductData.overdue_interest_frequency : 1),
      overdue_interest_interval: new FormControl(this.loanProductData ? this.loanProductData.overdue_interest_interval : null),
      repay_every: new FormControl(this.loanProductData ? this.loanProductData.repay_every : 0),
      repay_period: new FormControl(this.loanProductData ? this.loanProductData.repay_period : null, [Validators.required]),
      min_days_between_disbursal_and_first_repayment: new FormControl(
        this.loanProductData ? this.loanProductData.min_days_between_disbursal_and_first_repayment : null
      ),

      //settings
      amortization_method: new FormControl(this.loanProductData ? this.loanProductData.amortization_method : 0),
      interest_method: new FormControl(this.loanProductData ? this.loanProductData.interest_method : 0),
      interest_product_cal_method: new FormControl(this.loanProductData ? this.loanProductData.interest_product_cal_method : 1),
      interest_calculated_period: new FormControl(this.loanProductData ? this.loanProductData.interest_calculated_period : 1),
      repayment_strategy_id: new FormControl(this.loanProductData ? this.loanProductData.repayment_strategy_id : 1),
      interest_calculate_after: new FormControl(this.loanProductData ? this.loanProductData.interest_calculate_after : null),
      moratorium_on_principal: new FormControl(this.loanProductData ? this.loanProductData.moratorium_on_principal : null),
      moratorium_on_interest: new FormControl(this.loanProductData ? this.loanProductData.moratorium_on_interest : null),
      interest_on_which_day_opening: new FormControl(this.loanProductData ? this.loanProductData.interest_on_which_day_opening : null),
      base_day_issue_close: new FormControl(this.loanProductData ? this.loanProductData.base_day_issue_close : 5),
      loan_issue1: new FormControl(this.loanProductData ? this.loanProductData.loan_issue1 : 0),
      loan_issue2: new FormControl(this.loanProductData ? this.loanProductData.loan_issue2 : 0),
      loan_issue3: new FormControl(this.loanProductData ? this.loanProductData.loan_issue3 : 0),
      loan_close1: new FormControl(this.loanProductData ? this.loanProductData.loan_close1 : 0),
      loan_close2: new FormControl(this.loanProductData ? this.loanProductData.loan_close2 : 0),
      loan_close3: new FormControl(this.loanProductData ? this.loanProductData.loan_close3 : 0),
      loan_overdue_after_days: new FormControl(this.loanProductData ? this.loanProductData.loan_overdue_after_day : null),
      overdue_days_for_npa: new FormControl(this.loanProductData ? this.loanProductData.overdue_days_for_npa : null),
      days_in_month: new FormControl(this.loanProductData ? this.loanProductData.days_in_month : 0),
      days_in_year: new FormControl(this.loanProductData ? this.loanProductData.days_in_year : 0),
      interest_capitalize: new FormControl(this.loanProductData ? this.loanProductData.interest_capitalize : 1),
      overdue_interest_capitalize: new FormControl(this.loanProductData ? this.loanProductData.overdue_interest_capitalize : 1),
      charge_capitalize: new FormControl(this.loanProductData ? this.loanProductData.charge_capitalize : 1),
      allow_multiple_disbursals: new FormControl(this.loanProductData ? this.loanProductData.allow_multiple_disbursals : null),
      allow_reschedule: new FormControl(this.loanProductData ? this.loanProductData.allow_reschedule : 1),
      compound_type: new FormControl(this.loanProductData ? this.loanProductData.compound_type : 0),
      reschedule_strategy: new FormControl(this.loanProductData ? this.loanProductData.reschedule_strategy : 0),

      // Charges
      Charges: new FormArray([]),

      //accounting
      accounting_type: new FormControl(this.loanProductData ? this.loanProductData['accounting_type'] : 0),
      GLAccounts: this._fb.array([]),
      id1: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[0] ? this.loanProductData.GLAccounts[0].id1 : null) : null
      ),
      id2: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[1] ? this.loanProductData.GLAccounts[1].id2 : null) : null
      ),
      id3: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[2] ? this.loanProductData.GLAccounts[2].id3 : null) : null
      ),
      id4: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[3] ? this.loanProductData.GLAccounts[3].id4 : null) : null
      ),
      id5: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[4] ? this.loanProductData.GLAccounts[4].id5 : null) : null
      ),
      id6: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[5] ? this.loanProductData.GLAccounts[5].id6 : null) : null
      ),
      id7: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[6] ? this.loanProductData.GLAccounts[6].id7 : null) : null
      ),
      id8: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[7] ? this.loanProductData.GLAccounts[7].id8 : null) : null
      ),
      id9: new FormControl(
        this.loanProductData ? (this.loanProductData.GLAccounts[8] ? this.loanProductData.GLAccounts[8].id9 : null) : null
      )
    });
  }
  getGlData() {
    this.api.get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' }).subscribe((res) => {
      this.GLAccountData = res.payload.data;
    });
  }
  chargeList() {
    this.api.get(ApiRoutes.chargeMaster, { page: 0, size: 500 }).subscribe((response) => {
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
      if (Number(this.loanProductId) > 0) {
        this.getLoanProductData(this.loanProductId);
      }
    });
  }
  chargeTables() {
    const tempCharges = this.loanProductData.Charges;
    for (let j = 0; j < tempCharges.length; j++) {
      const object = this.chargeData.filter((i: any) => i.id === tempCharges[j].charge_id);
      tempCharges[j].charge_name = object[0].charge_name;
      tempCharges[j].amount = object[0].amount;
      tempCharges[j].charge_calculation_type = object[0].charge_calculation_type;
      if (tempCharges[j].id === 101) {
        this.charge101.push(tempCharges[j]);
        this.showTable101 = true;
      }
      if (tempCharges[j].id === 102) {
        this.charge102.push(tempCharges[j]);
        this.showTable102 = true;
      }
      if (tempCharges[j].id === 103) {
        this.charge103.push(tempCharges[j]);
        this.showTable103 = true;
      }
      if (tempCharges[j].id === 104) {
        this.charge104.push(tempCharges[j]);
        this.showTable104 = true;
      }
      if (tempCharges[j].id === 105) {
        this.charge105.push(tempCharges[j]);
        this.showTable105 = true;
      }
      if (tempCharges[j].id === 110) {
        this.charge110.push(tempCharges[j]);
        this.showTable110 = true;
      }
    }
  }
  getLoanProductData(id: any) {
    this.api.get(ApiRoutes.loanProductData, {}, id).subscribe((response) => {
      this.loanProductData = response.payload.data;

      if (this.loanProductData.Charges.length > 0) {
        this.chargeTables();
      }
    });
  }
  addCharge(id: number, arrayName: string) {
    if (this.tableObj !== undefined) {
      this.tableObj.id = id;

      switch (id) {
        case 101:
          if (this.charge101.find((i: any) => i.charge_id === this.tableObj.charge_id) === undefined) {
            this.charge101.push(this.tableObj);
            this.showTable101 = true;
          }
          break;
        case 102:
          if (this.charge102.find((i: any) => i.charge_id === this.tableObj.charge_id) === undefined) {
            this.charge102.push(this.tableObj);
            this.showTable102 = true;
          }
          break;
        case 103:
          if (this.charge103.find((i: any) => i.charge_id === this.tableObj.charge_id) === undefined) {
            this.charge103.push(this.tableObj);
            this.showTable103 = true;
          }
          break;
        case 104:
          if (this.charge104.find((i: any) => i.charge_id === this.tableObj.charge_id) === undefined) {
            this.charge104.push(this.tableObj);
            this.showTable104 = true;
          }
          break;
        case 105:
          if (this.charge105.find((i: any) => i.charge_id === this.tableObj.charge_id) === undefined) {
            this.charge105.push(this.tableObj);
            this.showTable105 = true;
          }
          break;
        case 110:
          if (this.charge110.find((i: any) => i.charge_id === this.tableObj.charge_id) === undefined) {
            this.charge110.push(this.tableObj);
            this.showTable110 = true;
          }
          break;
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
  onDelete(id: number, index: number, charge: any) {
    switch (id) {
      case 101:
        this.charge101.splice(index, 1);
        if (this.charge101.length < 1) {
          this.showTable101 = false;
        }
        break;
      case 102:
        this.charge102.splice(index, 1);
        if (this.charge102.length < 1) {
          this.showTable102 = false;
        }
        break;
      case 103:
        this.charge103.splice(index, 1);
        if (this.charge103.length < 1) {
          this.showTable103 = false;
        }
        break;
      case 104:
        this.charge104.splice(index, 1);
        if (this.charge104.length < 1) {
          this.showTable104 = false;
        }
        break;
      case 105:
        this.charge105.splice(index, 1);
        if (this.charge105.length < 1) {
          this.showTable105 = false;
        }
        break;
      case 110:
        this.charge110.splice(index, 1);
        if (this.charge110.length < 1) {
          this.showTable110 = false;
        }
        break;
    }
  }
  addOrderPosition() {
    for (let i = 0; i < this.charge101.length; i++) {
      this.charge101[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge102.length; i++) {
      this.charge102[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge103.length; i++) {
      this.charge103[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge104.length; i++) {
      this.charge104[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge105.length; i++) {
      this.charge105[i].order_position = i + 1;
    }
    for (let i = 0; i < this.charge110.length; i++) {
      this.charge110[i].order_position = i + 1;
    }
  }

  onSubmit() {
    this.addNewLoanProductForm.value['vouName'] = 'loan_product';
    if (this.addNewLoanProductForm.value['accounting_type'] === 1) {
      let tempArray = [
        { id1: this.addNewLoanProductForm.value['id1'] },
        { id2: this.addNewLoanProductForm.value['id2'] },
        { id3: this.addNewLoanProductForm.value['id3'] },
        { id4: this.addNewLoanProductForm.value['id4'] },
        { id5: this.addNewLoanProductForm.value['id5'] },
        { id5: this.addNewLoanProductForm.value['id5'] },
        { id6: this.addNewLoanProductForm.value['id6'] },
        { id7: this.addNewLoanProductForm.value['id7'] },
        { id8: this.addNewLoanProductForm.value['id8'] },
        { id9: this.addNewLoanProductForm.value['id9'] }
      ];
      this.addNewLoanProductForm.value['GLAccounts'] = tempArray;
    }
    this.addOrderPosition();
    this.addNewLoanProductForm.value['Charges'] = this.charge101.concat(
      this.charge102,
      this.charge103,
      this.charge104,
      this.charge105,
      this.charge110
    );

    if (this.addNewLoanProductForm.valid) {
      if (this.mode == 'Edit') {
        this.addNewLoanProductForm.value['EType'] = 'Edit';
        this.api.put(ApiRoutes.loanProductData, this.loanProductData.id, this.addNewLoanProductForm.value).subscribe((res) => {});
      } else {
        this.addNewLoanProductForm.value['EType'] = 'Add';
        this.api.post(ApiRoutes.loanProductData, this.addNewLoanProductForm.value).subscribe((res) => {});
      }
    }
  }
}
