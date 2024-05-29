import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.const';
import {
  AccountingTypeList,
  CsSavingWithdrawalList,
  DaysInMonthYearList,
  FrequencyList,
  InterestCalculationPeriodList,
  PreMaturePenalInterestList,
  RDInterestCalculationUsing,
  StatusList
} from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-rd-product',
  templateUrl: './add-rd-product.component.html',
  styleUrls: ['./add-rd-product.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddRdProductComponent {
  mode: 'Add' | 'Edit' = 'Add';
  addNewRDProductForm!: FormGroup;
  rdProductId!: number;
  yesNoList = StatusList;
  rdProductData!: any;
  frequencyList = FrequencyList;
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
  chargeData!: any;
  chargeDataType!: any;
  charge101: any = [];
  charge102: any = [];
  charge110: any = [];
  charge105: any = [];
  showTable101 = false;
  showTable102 = false;
  showTable110 = false;
  showTable105 = false;
  tempChargesDelete: any = [];
  tempChargesAdd: any = [];
  tableObj!: any;

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService,
    private _sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'RD-PRODUCT-MASTER' }]);
    this.ds.setPageTitle('RD-PRODUCT-MASTER');
    this.rdProductId = this._sharedService.getRDProductId();
    if (this.rdProductId > 0) {
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }

    this.chargeList();
    this.getGlData();
    this.createAddRdProductInformationForm();
  }

  createAddRdProductInformationForm() {
    this.addNewRDProductForm = this._fb.group({
      //details
      product_name: new FormControl(this.rdProductData ? this.rdProductData.product_name : null, [Validators.required]),
      in_native: new FormControl(this.rdProductData ? this.rdProductData.in_native : null),
      short_name: new FormControl(this.rdProductData ? this.rdProductData.short_name : null, [Validators.required]),
      start_date: new FormControl(this.rdProductData ? this.rdProductData.start_date : null),
      close_date: new FormControl(this.rdProductData ? this.rdProductData.close_date : null),
      description: new FormControl(this.rdProductData ? this.rdProductData.description : null),
      is_deactivated: new FormControl(this.rdProductData ? this.rdProductData.is_deactivated : 1),

      //tearms
      default_deposit_amount: new FormControl(this.rdProductData ? this.rdProductData.default_deposit_amount : null, [Validators.required]),
      min_deposit_amount: new FormControl(this.rdProductData ? this.rdProductData.min_deposit_amount : null, [Validators.required]),
      max_deposit_amount: new FormControl(this.rdProductData ? this.rdProductData.max_deposit_amount : null, [Validators.required]),
      deposit_period: new FormControl(this.rdProductData ? this.rdProductData.deposit_period : 1),
      annual_interest_rate: new FormControl(this.rdProductData ? this.rdProductData.annual_interest_rate : null, [Validators.required]),
      interest_compounding_period: new FormControl(this.rdProductData ? this.rdProductData.interest_compounding_period : 1),
      interest_posting_period: new FormControl(this.rdProductData ? this.rdProductData.interest_posting_period : 2),
      interest_calculation_using: new FormControl(this.rdProductData ? this.rdProductData.interest_calculation_using : 1),
      interest_calculation_days_in_year: new FormControl(this.rdProductData ? this.rdProductData.interest_calculation_days_in_year : 0),
      min_balance_for_interest_calculation: new FormControl(
        this.rdProductData ? this.rdProductData.min_balance_for_interest_calculation : null
      ),

      //settings
      is_deposit_mandatory: new FormControl(this.rdProductData ? this.rdProductData.is_deposit_mandatory : 1),
      withdrawal_policy: new FormControl(this.rdProductData ? this.rdProductData.withdrawal_policy : 0),
      adjust_advance_to_future_payments: new FormControl(this.rdProductData ? this.rdProductData.adjust_advance_to_future_payments : 1),
      max_installment_credited: new FormControl(this.rdProductData ? this.rdProductData.max_installment_credited : null),
      lockin_period_frequency: new FormControl(this.rdProductData ? this.rdProductData.lockin_period_frequency : null, [
        Validators.required
      ]),
      lockin_period_frequency_type: new FormControl(this.rdProductData ? this.rdProductData.lockin_period_frequency_type : 1),
      min_deposit_term: new FormControl(this.rdProductData ? this.rdProductData.min_deposit_term : null, [Validators.required]),
      min_deposit_term_type: new FormControl(this.rdProductData ? this.rdProductData.min_deposit_term_type : 1),
      max_deposit_term: new FormControl(this.rdProductData ? this.rdProductData.max_deposit_term : null, [Validators.required]),
      max_deposit_term_type: new FormControl(this.rdProductData ? this.rdProductData.max_deposit_term_type : 1),
      pre_mature_penal_interest: new FormControl(this.rdProductData ? this.rdProductData.pre_mature_penal_interest : null),
      pre_mature_penal_interest_on: new FormControl(this.rdProductData ? this.rdProductData.pre_mature_penal_interest_on : 1),
      apply_tds: new FormControl(this.rdProductData ? this.rdProductData.apply_tds : 1),
      tds_gl_account_id: new FormControl(this.rdProductData ? this.rdProductData.tds_gl_account_id : null),

      // Charges
      Charges: new FormArray([]),

      //accounting
      accounting_type: new FormControl(this.rdProductData ? this.rdProductData['accounting_type'] : null),
      GLAccounts: this._fb.array([]),
      id1: new FormControl(this.rdProductData ? (this.rdProductData.GLAccounts[0] ? this.rdProductData.GLAccounts[0].id1 : null) : null),
      id2: new FormControl(this.rdProductData ? (this.rdProductData.GLAccounts[1] ? this.rdProductData.GLAccounts[1].id2 : null) : null),
      id3: new FormControl(this.rdProductData ? (this.rdProductData.GLAccounts[2] ? this.rdProductData.GLAccounts[2].id3 : null) : null),
      id4: new FormControl(this.rdProductData ? (this.rdProductData.GLAccounts[3] ? this.rdProductData.GLAccounts[3].id4 : null) : null)
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
      if (Number(this.rdProductId) > 0) {
        this.getRDProductData(this.rdProductId);
      }
    });
  }

  getRDProductData(id: any) {
    this.api.get(ApiRoutes.recurringProductData, {}, id).subscribe((response) => {
      this.rdProductData = response.payload.data;

      if (this.rdProductData.Charges.length > 0) {
        this.chargeTables();
      }
      this.createAddRdProductInformationForm();
      this._sharedService.setRDProductId(0);
    });
  }
  chargeTables() {
    const tempCharges = this.rdProductData.Charges;
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
    if (this.rdProductId > 0) {
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
    this.addNewRDProductForm.value['vouName'] = 'rd_product';
    if (this.addNewRDProductForm.value['accounting_type'] === 1) {
      let tempArray = [
        { id1: this.addNewRDProductForm.value['id1'] },
        { id2: this.addNewRDProductForm.value['id2'] },
        { id3: this.addNewRDProductForm.value['id3'] },
        { id4: this.addNewRDProductForm.value['id4'] }
      ];
      this.addNewRDProductForm.value['GLAccounts'] = tempArray;
    }
    this.addOrderPosition();
    this.addNewRDProductForm.value['Charges'] = this.charge101.concat(this.charge102, this.charge105, this.charge110);
    if (this.addNewRDProductForm.valid) {
      if (this.mode == 'Edit') {
        this.addNewRDProductForm.value['EType'] = 'Edit';
        this.api.put(ApiRoutes.recurringProductData, this.rdProductData.id, this.addNewRDProductForm.value).subscribe((response) => {});

        this.router.navigateByUrl(APP_ROUTES.rdProduct);
      } else {
        this.addNewRDProductForm.value['EType'] = 'Add';
        this.api.post(ApiRoutes.recurringProductData, this.addNewRDProductForm.value).subscribe((res) => {
          this.router.navigateByUrl(APP_ROUTES.rdProduct);
        });
      }
    }
  }
}
