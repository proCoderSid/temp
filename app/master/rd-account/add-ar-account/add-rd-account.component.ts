import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import {
  CsSavingWithdrawalList,
  DaysInMonthYearList,
  Frequency,
  InterestCalculationPeriodList,
  PreMaturePenalInterestList,
  StatusList,
  amortizationMethod,
  compoundType,
  interestCalculationUsing,
  rescheduleStrategy,
  searchBy
} from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from '../../client/client.component';

@Component({
  selector: 'app-add-rd-account',
  templateUrl: './add-rd-account.component.html',
  styleUrls: ['./add-rd-account.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class AddrdAccountComponent {
  addNewRdAccountForm!: FormGroup;
  yesNoList = StatusList;
  showTable1 = false;
  nomineeData = [];
  rdAccountData!: any;
  selectedId!: number;
  searchBy = searchBy;
  branchData!: any;
  interestCalculationUsing = interestCalculationUsing;
  interestCompoundingPeriod = InterestCalculationPeriodList;
  interestPostingPeriod = InterestCalculationPeriodList.filter((i: any) => i.value !== 1);
  Frequency = Frequency;
  daysInYear = DaysInMonthYearList;
  amortizationMethod = amortizationMethod;
  compoundType = compoundType;
  rescheduleStrategy = rescheduleStrategy;
  RDWithdrawal = CsSavingWithdrawalList;
  cityData: any;
  AccOwnerType: any;
  AccAccessBy: any;
  RelationID: any;
  MemberType: any;
  rdProductData: any;
  selectedProductData: any;
  glAccData = [];
  preMaturePenalInterest = PreMaturePenalInterestList;
  searchKey!: string;
  labelData: any = {};
  rdAccountId: number = 0;
  showTable2 = false;
  accHolderData!: any;
  DisplayData!: any;
  accHolderTableArray: any[] = [];
  addJointAccData: any = [];
  showForm: boolean = false;
  cannotAlter = false;

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'RD-ACCOUNT-MASTER' }]);
    this.ds.setPageTitle('RD-ACCOUNT-MASTER');
    this.rdAccountId = this._sharedService.getRDAccountId();
    if (this.rdAccountId > 0) {
      this.getRDAccountData(this.rdAccountId);
      this._sharedService.setRDAccountId(0);
    } else {
      this.createAddFdProductInformationForm();
    }
  }

  createAddFdProductInformationForm() {
    this.addNewRdAccountForm = this._fb.group({
      account_no: new FormControl(this.rdAccountData ? this.rdAccountData['account_no'] : null),
      product_id: new FormControl(this.rdAccountData ? this.rdAccountData['product_id'] : null, Validators.required),
      branch_id: new FormControl('', Validators.required),
      access_from_all_branch: new FormControl(this.rdAccountData ? this.rdAccountData['access_from_all_branch'] : 1, Validators.required),
      field_officer_id: new FormControl(this.rdAccountData ? this.rdAccountData['field_officer_id'] : null),
      account_owner_type: new FormControl(this.rdAccountData ? this.rdAccountData['account_owner_type'] : null, Validators.required),
      account_access_by: new FormControl(this.rdAccountData ? this.rdAccountData['account_access_by'] : null, Validators.required),
      agent_id: new FormControl(this.rdAccountData ? this.rdAccountData['agent_id'] : null, Validators.required),
      description: new FormControl(this.rdAccountData ? this.rdAccountData['description'] : null),
      start_date: new FormControl(this.rdAccountData ? this.rdAccountData['start_date'] : null),
      deposit_amount: new FormControl(this.rdAccountData ? this.rdAccountData['deposit_amount'] : null),
      deposit_period: new FormControl(this.rdAccountData ? this.rdAccountData['deposit_period'] : 1),
      total_term: new FormControl(this.rdAccountData ? this.rdAccountData['total_term'] : null),
      maturity_date: new FormControl(this.rdAccountData ? this.rdAccountData['maturity_date'] : null),
      is_deactivated: new FormControl(this.rdAccountData ? this.rdAccountData['is_deactivated'] : 1),

      annual_interest_rate: new FormControl(this.rdAccountData ? this.rdAccountData['annual_interest_rate'] : null),
      interest_compounding_period: new FormControl(this.rdAccountData ? this.rdAccountData['interest_compounding_period'] : 1),
      interest_posting_period: new FormControl(this.rdAccountData ? this.rdAccountData['interest_posting_period'] : 2),
      interest_calculation_using: new FormControl(this.rdAccountData ? this.rdAccountData['interest_calculation_using'] : 1),
      interest_calculation_days_in_year: new FormControl(this.rdAccountData ? this.rdAccountData['interest_calculation_days_in_year'] : 0),
      min_balance_for_interest_calculation: new FormControl(
        this.rdAccountData ? this.rdAccountData['min_balance_for_interest_calculation'] : null
      ),
      is_deposit_mandatory: new FormControl(this.rdAccountData ? this.rdAccountData['is_deposit_mandatory'] : 1),
      withdrawal_policy: new FormControl(this.rdAccountData ? this.rdAccountData['withdrawal_policy'] : 0),
      adjust_advance_to_future_payments: new FormControl(this.rdAccountData ? this.rdAccountData['adjust_advance_to_future_payments'] : 1),
      max_installment_credited: new FormControl(this.rdAccountData ? this.rdAccountData['max_installment_credited'] : null),
      lockin_period_frequency: new FormControl(this.rdAccountData ? this.rdAccountData['lockin_period_frequency'] : null),
      lockin_period_frequency_type: new FormControl(this.rdAccountData ? this.rdAccountData['lockin_period_frequency_type'] : 1),
      pre_mature_penal_interest: new FormControl(this.rdAccountData ? this.rdAccountData['pre_mature_penal_interest'] : null),
      pre_mature_penal_interest_on: new FormControl(this.rdAccountData ? this.rdAccountData['pre_mature_penal_interest_on'] : 1),
      apply_tds: new FormControl(this.rdAccountData ? this.rdAccountData['apply_tds'] : null),
      tds_gl_account_id: new FormControl(this.rdAccountData ? this.rdAccountData['tds_gl_account_id'] : null),
      nominee_cif_id: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['nominee_cif_id'] : null) : null
      ),

      nominee_name: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['nominee_name'] : null) : null
      ),
      address1: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['address1'] : null) : null
      ),
      address2: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['address2'] : null) : null
      ),
      address3: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['address3'] : null) : null
      ),
      address4: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['address4'] : null) : null
      ),
      city_id: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['city_id'] : null) : null
      ),
      pin_code: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['pin_code'] : null) : null
      ),
      mobile_no: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['mobile_no'] : null) : null
      ),
      relation_id: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['relation_id'] : null) : null
      ),
      birth_date: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['birth_date'] : null) : null
      ),
      is_minor: new FormControl(
        this.rdAccountData
          ? this.rdAccountData['NomineeData'][0]
            ? this.rdAccountData['NomineeData'][0]['nomination_date']
              ? 1
              : 0
            : 0
          : 0
      ),
      nomination_date: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['nomination_date'] : null) : null
      ),
      guardian_name: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['guardian_name'] : null) : null
      ),
      remarks: new FormControl(
        this.rdAccountData ? (this.rdAccountData['NomineeData'][0] ? this.rdAccountData['NomineeData'][0]['remarks'] : null) : null
      ),
      joinee_cif_id: new FormControl(this.rdAccountData ? this.rdAccountData['joinee_cif_id'] : null),
      NomineeData: new FormArray([]),
      JointAccData: new FormArray([])
    });
  }
  updateSelectedId(newId: number) {
    this.selectedId = newId;
  }
  getRDAccountData(id: any) {
    this.api.get(ApiRoutes.RDAccountData, {}, id).subscribe((response) => {
      this.rdAccountData = response.payload.data;
      this.updateSelectedId(this.rdAccountData.cif_id);
      this.getBranchData();
      this.getRDProductData();
      this.getCityData();
      this.getCodeData();
      this.getGLAccount();
      this.createAddFdProductInformationForm();
      this.accHolderTableArray = this.rdAccountData.JointAccData;
      if (this.rdAccountData.NomineeData && this.rdAccountData.NomineeData[0].nominee_cif_id) {
        this.cannotAlter = false;
      }
      this.showForm = true;
    });
  }
  clientSelected(data: any) {
    this.addNewRdAccountForm = new FormGroup({});
    if (data && data.id) {
      this.selectedId = data.id;
      this.getBranchData();
      this.getRDProductData();
      this.getCityData();
      this.getCodeData();
      this.getGLAccount();
      this.createAddFdProductInformationForm();
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }
  getCityData() {
    this.api.get(ApiRoutes.cityList, { page: 1, size: 1500 }).subscribe((response) => {
      this.cityData = response.payload.data;
    });
  }
  getSelectedProductData(event: any) {
    this.api.get(ApiRoutes.recurringProductData, { page: 1, size: 1500 }, event.value).subscribe((response) => {
      this.selectedProductData = response.payload.data;
      this.addNewRdAccountForm.get('deposit_amount')?.setValue(this.selectedProductData.default_deposit_amount);
      this.addNewRdAccountForm.get('annual_interest_rate')?.setValue(this.selectedProductData.annual_interest_rate);
      this.addNewRdAccountForm.get('interest_compounding_period')?.setValue(this.selectedProductData.interest_compounding_period);
      this.addNewRdAccountForm.get('interest_posting_period')?.setValue(this.selectedProductData.interest_posting_period);
      this.addNewRdAccountForm.get('interest_calculation_using')?.setValue(this.selectedProductData.interest_calculation_using);
      this.addNewRdAccountForm
        .get('interest_calculation_days_in_year')
        ?.setValue(this.selectedProductData.interest_calculation_days_in_year);
      this.addNewRdAccountForm
        .get('min_balance_for_interest_calculation')
        ?.setValue(this.selectedProductData.min_balance_for_interest_calculation);
      this.addNewRdAccountForm.get('is_deposit_mandatory')?.setValue(this.selectedProductData.is_deposit_mandatory);
      this.addNewRdAccountForm.get('withdrawal_policy')?.setValue(this.selectedProductData.withdrawal_policy);
      this.addNewRdAccountForm
        .get('adjust_advance_to_future_payments')
        ?.setValue(this.selectedProductData.adjust_advance_to_future_payments);
      this.addNewRdAccountForm.get('max_installment_credited')?.setValue(this.selectedProductData.max_installment_credited);
      this.addNewRdAccountForm.get('lockin_period_frequency')?.setValue(this.selectedProductData.lockin_period_frequency);
      this.addNewRdAccountForm.get('lockin_period_frequency_type')?.setValue(this.selectedProductData.lockin_period_frequency_type);
      this.addNewRdAccountForm.get('pre_mature_penal_interest')?.setValue(this.selectedProductData.pre_mature_penal_interest);
      this.addNewRdAccountForm.get('pre_mature_penal_interest_on')?.setValue(this.selectedProductData.pre_mature_penal_interest_on);
      this.addNewRdAccountForm.get('apply_tds')?.setValue(this.selectedProductData.apply_tds);
      this.addNewRdAccountForm.get('tds_gl_account_id')?.setValue(this.selectedProductData.tds_gl_account_id);
    });
  }
  getBranchData() {
    this.api.get(ApiRoutes.branchMaster, { page: 1, size: 500 }).subscribe((response) => {
      this.branchData = response.payload.data;
    });
  }
  getCodeData() {
    this.api.get(ApiRoutes.CodeValue, { page: 1, size: 1500 }).subscribe((response) => {
      this.AccOwnerType = response.payload.data.filter((i: any) => i.code_name === 'AccOwnerType');
      this.AccAccessBy = response.payload.data.filter((i: any) => i.code_name === 'AccAccessBy');
      this.RelationID = response.payload.data.filter((i: any) => i.code_name === 'RelationID');
      this.MemberType = response.payload.data.filter((i: any) => i.code_name === 'MemberType');
    });
  }
  getRDProductData() {
    this.api.get(ApiRoutes.recurringProductData, { page: 1, size: 500 }).subscribe((response) => {
      this.rdProductData = response.payload.data;
    });
  }
  getGLAccount() {
    this.api
      .get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' })
      .subscribe((response) => {
        this.glAccData = response.payload.data;
      });
  }
  searchByEvent(event: any) {
    this.searchKey = event.value;
  }
  onAdd(data: any, key: any) {
    if (key === 1) {
      this.showTable1 = false;
      this.addNewRdAccountForm.get('nominee_cif_id')?.setValue(data.id);
      this.api.get(ApiRoutes.clientMaster, {}, data.id).subscribe((response) => {
        const DisplayValue = response.payload.data[0];
        if (DisplayValue !== null) {
          this.addNewRdAccountForm.get('nominee_name')?.setValue(DisplayValue.account_name);
          this.addNewRdAccountForm.get('address1')?.setValue(DisplayValue.address1);
          this.addNewRdAccountForm.get('address2')?.setValue(DisplayValue.address2);
          this.addNewRdAccountForm.get('address3')?.setValue(DisplayValue.address3);
          this.addNewRdAccountForm.get('address4')?.setValue(DisplayValue.address4);
          this.addNewRdAccountForm.get('city_id')?.setValue(DisplayValue.city_id);
          this.addNewRdAccountForm.get('pin_code')?.setValue(DisplayValue.pin_code);
          this.addNewRdAccountForm.get('mobile_no')?.setValue(DisplayValue.mobile_no);
          this.addNewRdAccountForm.get('birth_date')?.setValue(DisplayValue.birth_date);
          this.addNewRdAccountForm.get('relation_id')?.setValidators(Validators.required);
          this.labelData = {
            taluka_name: DisplayValue.taluka_name,
            district_name: DisplayValue.district_name,
            state_name: DisplayValue.state_name
          };
          this.cannotAlter = true;
        }
      });
    }
    if (key === 2) {
      this.showTable2 = false;
      this.api.get(ApiRoutes.clientMaster, {}, data.id).subscribe((response) => {
        this.DisplayData = response.payload.data[0];
        for (let j = 0; j < this.MemberType.length; j++) {
          if (this.DisplayData.member_type_id && this.DisplayData.member_type_id === this.MemberType[j].id) {
            this.DisplayData.member_type_name = this.MemberType[j].code_value;
          }
        }
      });
      if (this.accHolderTableArray.find((i: any) => i.id === data.id) === undefined) {
        this.accHolderTableArray.push(data);
        this.addJointAccData.push({ Name: data.display_name });
      }
    }
  }
  onDelete(index: any) {
    this.accHolderTableArray.splice(index, 1);
  }
  getClientData(target: any, key: any) {
    let tempObj = {
      [this.searchKey]: target.value
    };
    this.api.get(ApiRoutes.client, { page: 0, size: 500 }).subscribe((response) => {
      if (key === 1) {
        this.nomineeData = response.payload.data;
        this.nomineeData = this.nomineeData.filter((i: any) => i.id !== this.selectedId);
        if (this.nomineeData.length > 0) {
          this.showTable1 = true;
        }
      }
      if (key === 2) {
        this.accHolderData = response.payload.data;
        this.accHolderData = this.accHolderData.filter((i: any) => i.id !== this.selectedId);
        if (this.accHolderData.length > 0) {
          this.showTable2 = true;
        }
      }
    });
  }

  onSubmit() {
    if (this.addNewRdAccountForm.valid) {
      this.addNewRdAccountForm.value.birth_date = moment(this.addNewRdAccountForm.value.birth_date).format('YYYY-MM-DD');
      this.addNewRdAccountForm.value.nomination_date = moment(this.addNewRdAccountForm.value.nomination_date).format('YYYY-MM-DD');
      this.addNewRdAccountForm.value.start_date = moment(this.addNewRdAccountForm.value.start_date).format('YYYY-MM-DD');
      this.addNewRdAccountForm.value.vouName = 'rd_account';
      this.addNewRdAccountForm.value.cif_id = this.selectedId;
      let NomineeData = {
        nominee_cif_id: this.addNewRdAccountForm.value.nominee_cif_id,
        nominee_name: this.addNewRdAccountForm.value.nominee_name,
        address1: this.addNewRdAccountForm.value.address1,
        address2: this.addNewRdAccountForm.value.address2,
        address3: this.addNewRdAccountForm.value.address3,
        address4: this.addNewRdAccountForm.value.address4,
        mobile_no: this.addNewRdAccountForm.value.mobile_no,
        city_id: this.addNewRdAccountForm.value.city_id,
        pin_code: this.addNewRdAccountForm.value.pin_code,
        relation_id: this.addNewRdAccountForm.value.relation_id,
        birth_date: this.addNewRdAccountForm.value.birth_date,
        nomination_date: this.addNewRdAccountForm.value.nomination_date,
        guardian_name: this.addNewRdAccountForm.value.guardian_name,
        remarks: this.addNewRdAccountForm.value.remarks
      };
      this.addNewRdAccountForm.value.NomineeData.push(NomineeData);
      let JointAccData = [];
      for (let j = 0; j < this.accHolderTableArray.length; j++) {
        JointAccData.push({
          joinee_cif_id: this.accHolderTableArray[j].joinee_cif_id
            ? this.accHolderTableArray[j].joinee_cif_id
            : this.accHolderTableArray[j].id
        });
      }
      if (this.addNewRdAccountForm.get('account_owner_type')?.value == 90) {
        JointAccData = [];
      }
      this.addNewRdAccountForm.value.JointAccData = JointAccData;
      this.api.post(ApiRoutes.RDAccountData, this.addNewRdAccountForm.value).subscribe((res) => {
        console.log('response', res);
      });
    }
  }
}
