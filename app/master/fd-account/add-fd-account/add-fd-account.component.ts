import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import {
  DaysInMonthYearList,
  Frequency,
  InterestCalculationPeriodList,
  PreMaturePenalInterestList,
  StatusList,
  interestCalculationUsing,
  searchBy
} from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from '../../client/client.component';

@Component({
  selector: 'app-add-fd-account',
  templateUrl: './add-fd-account.component.html',
  styleUrls: ['./add-fd-account.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class AddFdAccountComponent {
  addNewFDAccountForm!: FormGroup;
  yesNoList = StatusList;
  fdAccountData!: any;
  selectedId!: number;
  cannotAlter = false;
  cityData: any;
  AccOwnerType: any;
  RelationID: any;
  MemberType: any;
  AccAccessBy: any;
  showTable1 = false;
  Frequency = Frequency;
  fdProductList: any;
  instrumentData: any;
  selectedProductData: any;
  interestCompoundingPeriod = InterestCalculationPeriodList;
  interestCalculationUsing = interestCalculationUsing;
  interestPostingPeriod = InterestCalculationPeriodList.filter((i: any) => i.value !== 1 && i.value !== 6);
  daysInYear = DaysInMonthYearList;
  preMaturePenalInterest = PreMaturePenalInterestList;
  branchData: any;
  voucherData: any;
  creditAccountDetails: any;
  savingsAccList: any;
  instrumentDisplayArray!: any[];
  tempArray: any[] = [];
  GLAccountData = [];
  nomineeData = [];
  debitAccountDetails: any = {};
  debitGLAccId!: number;
  voucherNumberData!: any[];
  selectedVouNum: any = {};
  userData: any = {};
  searchBy = searchBy;
  labelData: any = {};
  searchKey!: string;
  fdAccountId: number = 0;
  accHolderData!: any;
  showTable2 = false;
  accHolderTableArray: any[] = [];
  DisplayData!: any;
  addJointAccData: any = [];
  showForm: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'Master' }, { label: 'FD-ACCOUNT-MASTER' }]);
    this.ds.setPageTitle('FD-ACCOUNT-MASTER');
    this.createAddFdProductInformationForm();
    this.fdAccountId = this._sharedService.getFDAccountId();
    if (this.fdAccountId > 0) {
      this.getFDAccountData(this.fdAccountId);
      this._sharedService.setFDAccountId(0);
    } else {
      this.createAddFdProductInformationForm();
    }
  }
  updateSelectedId(newId: number) {
    this.selectedId = newId;
  }
  getFDAccountData(id: any) {
    this.api.get(ApiRoutes.FDAccountData, {}, id).subscribe((response) => {
      this.fdAccountData = response.payload.data;
      this.updateSelectedId(this.fdAccountData.cif_id);
      this.getVoucherData();
      this.createAddFdProductInformationForm();
      this.accHolderTableArray = this.fdAccountData.JointAccData;
      if (this.fdAccountData.NomineeData && this.fdAccountData.NomineeData[0].nominee_cif_id) {
        this.cannotAlter = false;
      }
      this.showForm = true;
    });
  }
  getBranchData() {
    this.api.get(ApiRoutes.branchMaster, { page: 1, size: 500 }).subscribe((response) => {
      this.branchData = response.payload.data;
    });
  }
  createAddFdProductInformationForm() {
    this.addNewFDAccountForm = this._fb.group({
      product_id: new FormControl(this.fdAccountData ? this.fdAccountData.product_id : null, Validators.required),
      account_no: new FormControl(this.fdAccountData ? this.fdAccountData.account_no : null),
      is_deactivated: new FormControl(this.fdAccountData ? this.fdAccountData.is_deactivated : 1),
      fd_date: new FormControl(this.fdAccountData ? this.fdAccountData.fd_date : null, Validators.required),
      as_on_date: new FormControl(this.fdAccountData ? this.fdAccountData.as_on_date : null, Validators.required),
      fdr_number: new FormControl(this.fdAccountData ? this.fdAccountData.fdr_number : null),
      deposit_amount: new FormControl(this.fdAccountData ? this.fdAccountData.deposit_amount : null, Validators.required),
      maturity_date: new FormControl(this.fdAccountData ? this.fdAccountData.maturity_date : null, Validators.required),
      deposit_term: new FormControl(this.fdAccountData ? this.fdAccountData.deposit_term : null, Validators.required),
      term_type: new FormControl(this.fdAccountData ? this.fdAccountData.term_type : 1),
      maturity_amt: new FormControl(this.fdAccountData ? this.fdAccountData.maturity_amt : null, Validators.required),
      auto_renewal: new FormControl(this.fdAccountData ? this.fdAccountData.auto_renewal : null, Validators.required),
      renew_with_interest: new FormControl(this.fdAccountData ? this.fdAccountData.renew_with_interest : null),
      savings_account_id: new FormControl(this.fdAccountData ? this.fdAccountData.savings_account_id : null),
      apply_tds: new FormControl(this.fdAccountData ? this.fdAccountData.apply_tds : null, Validators.required),
      branch_id: new FormControl(this.fdAccountData ? this.fdAccountData.branch_id : null, Validators.required),
      field_officer_id: new FormControl(this.fdAccountData ? this.fdAccountData.field_officer_id : null),
      account_owner_type: new FormControl(this.fdAccountData ? this.fdAccountData.account_owner_type : null, Validators.required),
      instrument_id: new FormControl(this.fdAccountData ? this.fdAccountData.instrument_id : null, Validators.required),
      gl_account_id: new FormControl(
        this.fdAccountData ? (this.fdAccountData.TRData.length > 0 ? this.fdAccountData.TRData[1].gl_account_id : null) : null,
        Validators.required
      ),
      account_access_by: new FormControl(this.fdAccountData ? this.fdAccountData.account_access_by : null, Validators.required),
      cheque_number: new FormControl(
        this.fdAccountData ? (this.fdAccountData.TRData.length > 0 ? this.fdAccountData.TRData[1].cheque_number : null) : null
      ),
      cheque_date: new FormControl(
        this.fdAccountData ? (this.fdAccountData.TRData.length > 0 ? this.fdAccountData.TRData[1].cheque_date : null) : null
      ),
      description: new FormControl(this.fdAccountData ? this.fdAccountData.description : null),
      receipt_number: new FormControl(
        this.fdAccountData ? (this.fdAccountData.TRData.length > 0 ? this.fdAccountData.TRData[1].voucher_number : null) : null
      ),
      t_remarks: new FormControl(
        this.fdAccountData ? (this.fdAccountData.TRData.length > 0 ? this.fdAccountData.TRData[1].remarks : null) : null
      ),
      annual_interest_rate: new FormControl(this.fdAccountData ? this.fdAccountData.annual_interest_rate : null),
      interest_pay_out: new FormControl(this.fdAccountData ? this.fdAccountData.interest_pay_out : 1),
      interest_compounding_period: new FormControl(this.fdAccountData ? this.fdAccountData.interest_compounding_period : 1),
      interest_posting_period: new FormControl(this.fdAccountData ? this.fdAccountData.interest_posting_period : 2),
      interest_calculation_using: new FormControl(this.fdAccountData ? this.fdAccountData.interest_calculation_using : 1),
      interest_calculation_days_in_year: new FormControl(this.fdAccountData ? this.fdAccountData.interest_calculation_days_in_year : 0),
      lockin_period_frequency: new FormControl(this.fdAccountData ? this.fdAccountData.lockin_period_frequency : null),
      lockin_period_frequency_type: new FormControl(this.fdAccountData ? this.fdAccountData.lockin_period_frequency_type : 1),
      pre_mature_penal_interest: new FormControl(this.fdAccountData ? this.fdAccountData.pre_mature_penal_interest : null),
      pre_mature_penal_interest_on: new FormControl(this.fdAccountData ? this.fdAccountData.pre_mature_penal_interest_on : 1),

      nominee_cif_id: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].nominee_cif_id : null) : null
      ),
      nominee_name: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].nominee_name : null) : null
      ),
      address1: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].address1 : null) : null
      ),
      address2: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].address2 : null) : null
      ),
      address3: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].address3 : null) : null
      ),
      address4: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].address4 : null) : null
      ),
      city_id: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].city_id : null) : null
      ),
      pin_code: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].pin_code : null) : null
      ),
      mobile_no: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].mobile_no : null) : null
      ),
      relation_id: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].relation_id : null) : null
      ),
      birth_date: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].birth_date : null) : null
      ),
      is_minor: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? (this.fdAccountData.NomineeData[0].nomination_date ? 1 : 0) : 0) : 0
      ),
      nomination_date: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].nomination_date : null) : null
      ),
      guardian_name: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].guardian_name : null) : null
      ),
      remarks: new FormControl(
        this.fdAccountData ? (this.fdAccountData.NomineeData[0] ? this.fdAccountData.NomineeData[0].remarks : null) : null
      ),
      joinee_cif_id: new FormControl(this.fdAccountData ? this.fdAccountData.joinee_cif_id : null),

      NomineeData: new FormArray([]),
      JointAccData: new FormArray([])
    });
  }
  clientSelected(data: any) {
    if (data && data.id) {
      this.selectedId = data.id;
      this.getVoucherData();
      this.creditAccountDetails = data;
      this.api.get(ApiRoutes.savingsAccountList, { cifID: this.selectedId }, 0).subscribe((response) => {
        this.savingsAccList = response.payload.data;
      });
    }
  }
  searchByEvent(event: any) {
    this.searchKey = event.value;
  }
  getClientData(target: any, key: any) {
    const tempObj = { [this.searchKey]: target.value };
    this.api.get(ApiRoutes.client, { page: 0, size: 500 }, 0, tempObj).subscribe((response) => {
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
  onAdd(data: any, key: any) {
    if (key === 1) {
      this.showTable1 = false;
      this.addNewFDAccountForm.get('nominee_cif_id')?.setValue(data.id);
      this.api.get(ApiRoutes.clientMaster, {}, data.id).subscribe((response) => {
        const DisplayValue = response.payload.data[0];
        if (DisplayValue !== null) {
          this.addNewFDAccountForm.get('nominee_name')?.setValue(DisplayValue.account_name);
          this.addNewFDAccountForm.get('address1')?.setValue(DisplayValue.address1);
          this.addNewFDAccountForm.get('address2')?.setValue(DisplayValue.address2);
          this.addNewFDAccountForm.get('address3')?.setValue(DisplayValue.address3);
          this.addNewFDAccountForm.get('address4')?.setValue(DisplayValue.address4);
          this.addNewFDAccountForm.get('city_id')?.setValue(DisplayValue.city_id);
          this.addNewFDAccountForm.get('pin_code')?.setValue(DisplayValue.pin_code);
          this.addNewFDAccountForm.get('mobile_no')?.setValue(DisplayValue.mobile_no);
          this.addNewFDAccountForm.get('birth_date')?.setValue(DisplayValue.birth_date);
          this.addNewFDAccountForm.get('relation_id')?.setValidators(Validators.required);
          this.labelData = {
            taluka_name: DisplayValue.taluka_name,
            district_name: DisplayValue.district_name,
            state_name: DisplayValue.state_name
          };
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
      }
    }
  }
  onDelete(index: any) {
    this.accHolderTableArray.splice(index, 1);
  }
  getVoucherData() {
    this.api.get(ApiRoutes.userVoucherData, { vouName: 'fd_account' }, 0).subscribe((response) => {
      this.voucherData = response.payload.data;
      if (this.voucherData && this.voucherData[0].add_grant === 1) {
        this.getNumberPreference();
        this.getInstrumentData();
        this.getFDProductList();
        this.getBranchData();
        this.getCodeData();
        this.getCityData();
        this.showForm = true;
      }
    });
  }
  getNumberPreference() {
    this.api.post(ApiRoutes.checkNumber, { vouID: this.voucherData[0].voucher_id }).subscribe((response) => {
      this.voucherNumberData = response.payload.data;
      if (this.voucherNumberData.length === 1) {
        if (this.voucherNumberData[0].NumType === 1 || 3) {
          this.selectedVouNum = this.voucherNumberData[0];
        }
      }
    });
  }
  getInstrumentData() {
    this.api.get(ApiRoutes.InstrumentData, { page: 1, size: 500 }).subscribe((response) => {
      this.instrumentData = response.payload.data;
      const instrumentIdArray = this.voucherData[0].instrument_data.split(',');
      for (let i = 0; i < instrumentIdArray.length; i++) {
        const tempObject: any = this.instrumentData.filter((j: any) => j.id === Number(instrumentIdArray[i]));
        this.tempArray.push(...tempObject);
      }
      this.instrumentDisplayArray = this.tempArray;
    });
  }
  getCityData() {
    this.api.get(ApiRoutes.cityList, { page: 1, size: 1500 }).subscribe((response) => {
      this.cityData = response.payload.data;
    });
  }
  instrumentChanged(event: any) {
    const id = event.value;
    this.addNewFDAccountForm.get('gl_account_id')?.setValue(null);
    if (id === 2) {
      this.GLAccountData = this.savingsAccList;
      this.addNewFDAccountForm.get('gl_account_id')?.setValue(this.addNewFDAccountForm.get('savings_account_id')?.value);
      let tempObject = this.savingsAccList.filter((i: any) => i.id === Number(this.addNewFDAccountForm.get('savings_account_id')?.value));
      this.savingsCheque(tempObject[0], 'Deposit');
    }
    // if (id === 6) {
    //   this.api.get(ApiRoutes.GlAccMasterData, { id: this.userData['branchData'].cheque_gl_account_id }, 0).subscribe((response) => {
    //     this.debitGLAccId = 0;
    //     this.debitAccountDetails = null;
    //     this.GLAccountData = [];
    //     this.GLAccountData = response.payload.data;
    //   });
    // }
    // if (id === 1 || id === 5) {
    //   this.api.get(ApiRoutes.GlAccMasterData, { id: this.userData['branchData'].cash_gl_account_id }, 0).subscribe((response) => {
    //     this.debitGLAccId = 0;
    //     this.debitAccountDetails = null;
    //     this.GLAccountData = [];
    //     this.GLAccountData = response.payload.data;
    //   });
    // }
  }
  savingsCheque(data: any, key: string) {
    if (this.addNewFDAccountForm.get('instrument_id')?.value === 2) {
      this.debitAccountDetails = data;
      const status = this.transactionValidation(this.debitAccountDetails, this.addNewFDAccountForm.get('deposit_amount')?.value);
      if (status !== 'valid' && key === 'transaction') {
        this.addNewFDAccountForm.get('deposit_amount')?.setValue(null);
      } else {
        this.api.get(ApiRoutes.savingProductData, {}, data.product_id).subscribe((response) => {
          let savProductData = response.payload.data;
          this.debitGLAccId = savProductData?.GLAccounts[0]?.id1;
        });
      }
    }
  }
  transactionValidation(data: any, amount: number) {
    if (data && data.account_balance_derived) {
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
  }
  getCodeData() {
    this.api.get(ApiRoutes.CodeValue, { page: 1, size: 1500 }).subscribe((response) => {
      this.AccOwnerType = response.payload.data.filter((i: any) => i.code_name === 'AccOwnerType');
      this.AccAccessBy = response.payload.data.filter((i: any) => i.code_name === 'AccAccessBy');
      this.RelationID = response.payload.data.filter((i: any) => i.code_name === 'RelationID');
      this.MemberType = response.payload.data.filter((i: any) => i.code_name === 'MemberType');
    });
  }
  getFDProductList() {
    this.api.get(ApiRoutes.fdProductData, { page: 1, size: 500 }).subscribe((response) => {
      this.fdProductList = response.payload.data;
    });
  }
  getSelectedProductData(event: any) {
    this.api.get(ApiRoutes.fdProductData, {}, event.value).subscribe((response) => {
      this.selectedProductData = response.payload.data;
      this.addNewFDAccountForm.get('auto_renewal')?.setValue(this.selectedProductData.auto_renewal);
      this.addNewFDAccountForm.get('renew_with_interest')?.setValue(this.selectedProductData.renew_with_interest);
      this.addNewFDAccountForm.get('annual_interest_rate')?.setValue(this.selectedProductData.annual_interest_rate);
      this.addNewFDAccountForm.get('interest_pay_out')?.setValue(this.selectedProductData.interest_pay_out);
      this.addNewFDAccountForm.get('interest_compounding_period')?.setValue(this.selectedProductData.interest_compounding_period);
      this.addNewFDAccountForm.get('interest_posting_period')?.setValue(this.selectedProductData.interest_posting_period);
      this.addNewFDAccountForm.get('interest_calculation_using')?.setValue(this.selectedProductData.interest_calculation_using);
      this.addNewFDAccountForm
        .get('interest_calculation_days_in_year')
        ?.setValue(this.selectedProductData.interest_calculation_days_in_year);
      this.addNewFDAccountForm.get('lockin_period_frequency')?.setValue(this.selectedProductData.lockin_period_frequency);
      this.addNewFDAccountForm.get('lockin_period_frequency_type')?.setValue(this.selectedProductData.lockin_period_frequency_type);
      this.addNewFDAccountForm.get('pre_mature_penal_interest')?.setValue(this.selectedProductData.pre_mature_penal_interest);
      this.addNewFDAccountForm.get('pre_mature_penal_interest_on')?.setValue(this.selectedProductData.pre_mature_penal_interest_on);
      this.addNewFDAccountForm.get('apply_tds')?.setValue(this.selectedProductData.apply_tds);
    });
  }
  onSubmit() {
    if (!this.addNewFDAccountForm.valid) {
      this.addNewFDAccountForm.value.cif_id = this.selectedId;
      this.addNewFDAccountForm.value.fd_date = moment(this.addNewFDAccountForm.value.fd_date).format('YYYY-MM-DD');
      this.addNewFDAccountForm.value.as_on_date = moment(this.addNewFDAccountForm.value.as_on_date).format('YYYY-MM-DD');
      this.addNewFDAccountForm.value.maturity_date = moment(this.addNewFDAccountForm.value.maturity_date).format('YYYY-MM-DD');
      this.addNewFDAccountForm.value.cheque_date = moment(this.addNewFDAccountForm.value.cheque_date).format('YYYY-MM-DD');
      const NomineeData = {
        nominee_cif_id: this.addNewFDAccountForm.value.nominee_cif_id,
        nominee_name: this.addNewFDAccountForm.value.nominee_name,
        address1: this.addNewFDAccountForm.value.address1,
        address2: this.addNewFDAccountForm.value.address2,
        address3: this.addNewFDAccountForm.value.address3,
        address4: this.addNewFDAccountForm.value.address4,
        mobile_no: this.addNewFDAccountForm.value.mobile_no,
        city_id: this.addNewFDAccountForm.value.city_id,
        pin_code: this.addNewFDAccountForm.value.pin_code,
        relation_id: this.addNewFDAccountForm.value.relation_id,
        birth_date: this.addNewFDAccountForm.value.birth_date,
        nomination_date: this.addNewFDAccountForm.value.nomination_date,
        guardian_name: this.addNewFDAccountForm.value.guardian_name,
        remarks: this.addNewFDAccountForm.value.remarks
      };
      this.addNewFDAccountForm.value.NomineeData.push(NomineeData);
      let JointAccData = [];
      for (let j = 0; j < this.accHolderTableArray.length; j++) {
        JointAccData.push({
          joinee_cif_id: this.accHolderTableArray[j].joinee_cif_id
            ? this.accHolderTableArray[j].joinee_cif_id
            : this.accHolderTableArray[j].id
        });
      }
      if (this.addNewFDAccountForm.get('account_owner_type')?.value == 90) {
        JointAccData = [];
      }
      this.addNewFDAccountForm.value.JointAccData = JointAccData;
      this.api.post(ApiRoutes.FDAccountData, this.addNewFDAccountForm.value).subscribe((res) => {});
    }
  }
}
