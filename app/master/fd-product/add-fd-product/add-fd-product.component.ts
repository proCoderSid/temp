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
  StatusList,
  fdProductType
} from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-fd-product',
  templateUrl: './add-fd-product.component.html',
  styleUrls: ['./add-fd-product.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddFdProductComponent {
  mode: 'Add' | 'Edit' = 'Add';
  addNewFDProductForm!: FormGroup;
  fdProductId!: number;
  fdProductData!: any;
  obj: any = { is_deleted: 0 };
  yesNoList = StatusList;
  frequencyList = FrequencyList;
  fdProductType = fdProductType;
  interestCompoundingPeriod = InterestCalculationPeriodList;
  interestPostingPeriod = InterestCalculationPeriodList.filter((i: any) => i.value !== 1 && i.value !== 6);
  interestPayOut = this.interestCompoundingPeriod.filter((i: any) => i.value !== 1);
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
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'Master' }, { label: 'FD-PRODUCT-MASTER' }]);
    this.ds.setPageTitle('FD-PRODUCT-MASTER');
    this.fdProductId = this._sharedService.getFDProductId();
    if (this.fdProductId > 0) {
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
    this.getGlData();
    this.chargeList();
    this.createAddFdProductInformationForm();
  }

  createAddFdProductInformationForm() {
    this.addNewFDProductForm = this._fb.group({
      //details
      product_name: new FormControl(this.fdProductData ? this.fdProductData.product_name : null, [Validators.required]),
      product_type: new FormControl(this.fdProductData ? this.fdProductData.product_type : 0),
      in_native: new FormControl(this.fdProductData ? this.fdProductData.in_native : null),
      short_name: new FormControl(this.fdProductData ? this.fdProductData.short_name : null, [Validators.required]),
      start_date: new FormControl(this.fdProductData ? this.fdProductData.start_date : null),
      close_date: new FormControl(this.fdProductData ? this.fdProductData.close_date : null),
      description: new FormControl(this.fdProductData ? this.fdProductData.description : null),
      is_deactivated: new FormControl(this.fdProductData ? this.fdProductData.is_deactivated : 1),

      //tearms
      default_deposit_amount: new FormControl(this.fdProductData ? this.fdProductData.default_deposit_amount : null, [Validators.required]),
      min_deposit_amount: new FormControl(this.fdProductData ? this.fdProductData.min_deposit_amount : null, [Validators.required]),
      max_deposit_amount: new FormControl(this.fdProductData ? this.fdProductData.max_deposit_amount : null, [Validators.required]),
      interest_pay_out: new FormControl(this.fdProductData ? this.fdProductData.interest_pay_out : 2),
      annual_interest_rate: new FormControl(this.fdProductData ? this.fdProductData.annual_interest_rate : null, [Validators.required]),
      interest_compounding_period: new FormControl(this.fdProductData ? this.fdProductData.interest_compounding_period : 1),
      interest_posting_period: new FormControl(this.fdProductData ? this.fdProductData.interest_posting_period : 2),
      interest_calculation_using: new FormControl(this.fdProductData ? this.fdProductData.interest_calculation_using : 1),
      interest_calculation_days_in_year: new FormControl(this.fdProductData ? this.fdProductData.interest_calculation_days_in_year : 0),
      auto_renewal: new FormControl(this.fdProductData ? this.fdProductData.auto_renewal : 1),
      renew_with_interest: new FormControl(this.fdProductData ? this.fdProductData.renew_with_interest : 1),

      //settings
      lockin_period_frequency: new FormControl(this.fdProductData ? this.fdProductData.lockin_period_frequency : null),
      lockin_period_frequency_type: new FormControl(
        this.fdProductData && this.fdProductData.lockin_period_frequency_type ? this.fdProductData.lockin_period_frequency_type : 1
      ),
      min_deposit_term: new FormControl(this.fdProductData ? this.fdProductData.min_deposit_term : null, [Validators.required]),
      min_deposit_term_type: new FormControl(this.fdProductData ? this.fdProductData.min_deposit_term_type : 1),
      max_deposit_term: new FormControl(this.fdProductData ? this.fdProductData.max_deposit_term : null, [Validators.required]),
      max_deposit_term_type: new FormControl(this.fdProductData ? this.fdProductData.max_deposit_term_type : 1),
      pre_mature_penal_interest: new FormControl(this.fdProductData ? this.fdProductData.pre_mature_penal_interest : null),
      pre_mature_penal_interest_on: new FormControl(
        this.fdProductData && this.fdProductData.pre_mature_penal_interest_on ? this.fdProductData.pre_mature_penal_interest_on : 1
      ),
      apply_tds: new FormControl(this.fdProductData ? this.fdProductData.apply_tds : null),
      tds_gl_account_id: new FormControl(this.fdProductData ? this.fdProductData.tds_gl_account_id : null),

      // Charges
      Charges: new FormArray([]),

      //accounting
      accounting_type: new FormControl(this.fdProductData ? this.fdProductData.accounting_type : null),
      GLAccounts: this._fb.array([]),
      id1: new FormControl(this.fdProductData ? (this.fdProductData.GLAccounts[0] ? this.fdProductData.GLAccounts[0].id1 : null) : null),
      id2: new FormControl(this.fdProductData ? (this.fdProductData.GLAccounts[1] ? this.fdProductData.GLAccounts[1].id2 : null) : null),
      id3: new FormControl(this.fdProductData ? (this.fdProductData.GLAccounts[2] ? this.fdProductData.GLAccounts[2].id3 : null) : null),
      id4: new FormControl(this.fdProductData ? (this.fdProductData.GLAccounts[3] ? this.fdProductData.GLAccounts[3].id4 : null) : null)
    });
  }
  getGlData() {
    this.api.get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' }).subscribe((res) => {
      console.log(res.payload.data);
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
      if (Number(this.fdProductId) > 0) {
        this.getFDProductData(this.fdProductId);
      }
    });
  }
  getFDProductData(id: any) {
    this.api.get(ApiRoutes.fdProductData, {}, id).subscribe((response) => {
      this.fdProductData = response.payload.data;
      console.log(this.fdProductData);

      if (this.fdProductData.Charges.length > 0) {
        this.chargeTables();
      }
      this.createAddFdProductInformationForm();
      this._sharedService.setFDProductId(0);
    });
  }
  chargeTables() {
    const tempCharges = this.fdProductData.Charges;
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
  onDelete(id: number, index: number, charge: any) {
    if (this.fdProductId > 0) {
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
    if (this.addNewFDProductForm.value['accounting_type'] === 1) {
      let tempArray = [
        { id1: this.addNewFDProductForm.value['id1'] },
        { id2: this.addNewFDProductForm.value['id2'] },
        { id3: this.addNewFDProductForm.value['id3'] },
        { id4: this.addNewFDProductForm.value['id4'] }
      ];
      this.addNewFDProductForm.value['GLAccounts'] = tempArray;
    }
    this.addOrderPosition();
    this.addNewFDProductForm.value['Charges'] = this.charge101.concat(this.charge102, this.charge105, this.charge110);

    this.addNewFDProductForm.value['vouName'] = 'fd_product';
    console.log(this.addNewFDProductForm.value);
    if (this.addNewFDProductForm.valid) {
      if (this.mode == 'Edit') {
        this.addNewFDProductForm.value['EType'] = 'Edit';
        this.api.put(ApiRoutes.fdProductData, this.fdProductData.id, this.addNewFDProductForm.value).subscribe((res) => {
          console.log('response', res);
        });
      } else {
        this.addNewFDProductForm.value['EType'] = 'Add';
        this.api.post(ApiRoutes.fdProductData, this.addNewFDProductForm.value).subscribe((res) => {
          console.log('response', res);
        });
      }
    }
  }
}
