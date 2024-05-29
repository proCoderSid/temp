import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import {
  Frequency,
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
  selector: 'app-add-savings-account',
  templateUrl: './add-savings-account.component.html',
  styleUrls: ['./add-savings-account.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class AddSavingsAccountComponent {
  addNewSavingsAccountForm!: FormGroup;
  savingsAccountData!: any;
  loadForm = false;
  yesNoList = StatusList;
  searchBy = searchBy;
  selectedId!: number;
  interestCalculationUsing = interestCalculationUsing;
  Frequency = Frequency;
  amortizationMethod = amortizationMethod;
  compoundType = compoundType;
  rescheduleStrategy = rescheduleStrategy;
  cityData: any;
  AccOwnerType: any;
  AccAccessBy: any;
  RelationID: any;
  MemberType: any;
  savingsProductData: any;
  searchKey!: string;
  showTable1 = false;
  nomineeData = [];
  labelData: any = {};
  selectedProductData!: any;
  branchData!: any;
  glAccData = [];
  savingsAccountId!: number;
  showTable2 = false;
  accHolderData!: any;
  DisplayData!: any;
  accHolderTableArray: any[] = [];
  addJointAccData: any = [];
  showForm: boolean = false;
  cannotAlter = false;
  umang = false;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService,
    private _sharedService: SharedService
  ) {}
  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'SAVING-ACCOUNT-MASTER' }]);
    this.ds.setPageTitle('SAVING-ACCOUNT-MASTER');
    this.savingsAccountId = this._sharedService.getSavingsAccountId();
    if (this.savingsAccountId > 0) {
      this.getSavingsAccountData(this.savingsAccountId);
      this._sharedService.setSavingsAccountId(0);
    } else {
      this.createAddFdProductInformationForm();
    }
  }
  createAddFdProductInformationForm() {
    this.addNewSavingsAccountForm = this._fb.group({
      account_no: new FormControl(this.savingsAccountData ? this.savingsAccountData.account_no : null),
      product_id: new FormControl(this.savingsAccountData ? this.savingsAccountData.product_id : null, Validators.required),
      branch_id: new FormControl(this.savingsAccountData ? this.savingsAccountData.access_from_all_branch : 1, Validators.required),
      access_from_all_branch: new FormControl(1, Validators.required),
      field_officer_id: new FormControl(this.savingsAccountData ? this.savingsAccountData.field_officer_id : null),
      account_owner_type: new FormControl(this.savingsAccountData ? this.savingsAccountData.account_owner_type : null, Validators.required),
      account_access_by: new FormControl(this.savingsAccountData ? this.savingsAccountData.account_access_by : null, Validators.required),
      submittedon_date: new FormControl(this.savingsAccountData ? this.savingsAccountData.submittedon_date : null, Validators.required),
      description: new FormControl(this.savingsAccountData ? this.savingsAccountData.description : null),
      enforce_min_required_balance: new FormControl(this.savingsAccountData ? this.savingsAccountData.enforce_min_required_balance : null),
      min_required_balance: new FormControl(this.savingsAccountData ? this.savingsAccountData.min_required_balance : null),
      allow_overdraft: new FormControl(this.savingsAccountData ? this.savingsAccountData.allow_overdraft : null),
      overdraft_limit: new FormControl(this.savingsAccountData ? this.savingsAccountData.overdraft_limit : null),
      annual_interest_rate_overdraft: new FormControl(
        this.savingsAccountData ? this.savingsAccountData.annual_interest_rate_overdraft : null
      ),
      min_overdraft_for_interest_calculation: new FormControl(
        this.savingsAccountData ? this.savingsAccountData.min_overdraft_for_interest_calculation : null
      ),
      apply_tds: new FormControl(this.savingsAccountData ? this.savingsAccountData.apply_tds : null),
      tds_gl_account_id: new FormControl(this.savingsAccountData ? this.savingsAccountData.tds_gl_account_id : null),
      nominee_cif_id: new FormControl(
        this.savingsAccountData
          ? this.savingsAccountData.NomineeData[0]
            ? this.savingsAccountData.NomineeData[0].nominee_cif_id
            : null
          : null
      ),
      nominee_name: new FormControl(
        this.savingsAccountData
          ? this.savingsAccountData.NomineeData[0]
            ? this.savingsAccountData.NomineeData[0].nominee_name
            : null
          : null
      ),
      address1: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].address1 : null) : null
      ),
      address2: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].address2 : null) : null
      ),
      address3: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].address3 : null) : null
      ),
      address4: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].address4 : null) : null
      ),
      city_id: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].city_id : null) : null
      ),
      pin_code: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].pin_code : null) : null
      ),
      mobile_no: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].mobile_no : null) : null
      ),
      relation_id: new FormControl(
        this.savingsAccountData
          ? this.savingsAccountData.NomineeData[0]
            ? this.savingsAccountData.NomineeData[0].relation_id
            : null
          : null
      ),
      birth_date: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].birth_date : null) : null
      ),
      is_minor: new FormControl(
        this.savingsAccountData
          ? this.savingsAccountData.NomineeData[0]
            ? this.savingsAccountData.NomineeData[0].nomination_date
              ? 1
              : 0
            : 0
          : 0
      ),
      nomination_date: new FormControl(
        this.savingsAccountData
          ? this.savingsAccountData.NomineeData[0]
            ? this.savingsAccountData.NomineeData[0].nomination_date
            : null
          : null
      ),
      guardian_name: new FormControl(
        this.savingsAccountData
          ? this.savingsAccountData.NomineeData[0]
            ? this.savingsAccountData.NomineeData[0].guardian_name
            : null
          : null
      ),
      remarks: new FormControl(
        this.savingsAccountData ? (this.savingsAccountData.NomineeData[0] ? this.savingsAccountData.NomineeData[0].remarks : null) : null
      ),
      joinee_cif_id: new FormControl(this.savingsAccountData ? this.savingsAccountData.joinee_cif_id : null),
      is_deactivated: new FormControl(this.savingsAccountData ? this.savingsAccountData.is_deactivated : 1),
      NomineeData: new FormArray([]),
      JointAccData: new FormArray([])
    });
  }
  updateSelectedId(newId: number) {
    this.selectedId = newId;
  }
  getSavingsAccountData(id: any) {
    this.api.get(ApiRoutes.savingAccountData, {}, id).subscribe((response) => {
      this.savingsAccountData = response.payload.data;
      this.updateSelectedId(this.savingsAccountData.cif_id);
      this.getSavingProductData();
      this.getBranchData();
      this.getCodeData();
      this.getCityData();
      this.getGLAccount();
      this.createAddFdProductInformationForm();
      this.accHolderTableArray = this.savingsAccountData.JointAccData;
      if (this.savingsAccountData.NomineeData && this.savingsAccountData.NomineeData[0].nominee_cif_id) {
        this.cannotAlter = false;
      }
      this.showForm = true;
    });
  }
  getSelectedProductData(event: any) {
    this.api.get(ApiRoutes.savingProductData, {}, event.value).subscribe((response) => {
      this.selectedProductData = response.payload.data;
      this.addNewSavingsAccountForm.get('enforce_min_required_balance')?.setValue(this.selectedProductData.enforce_min_required_balance);
      this.addNewSavingsAccountForm.get('min_required_balance')?.setValue(this.selectedProductData.min_required_balance);
      this.addNewSavingsAccountForm.get('allow_overdraft')?.setValue(this.selectedProductData.allow_overdraft);
      this.addNewSavingsAccountForm.get('overdraft_limit')?.setValue(this.selectedProductData.overdraft_limit);
      this.addNewSavingsAccountForm
        .get('annual_interest_rate_overdraft')
        ?.setValue(this.selectedProductData.annual_interest_rate_overdraft);
      this.addNewSavingsAccountForm
        .get('min_overdraft_for_interest_calculation')
        ?.setValue(this.selectedProductData.min_overdraft_for_interest_calculation);
      this.addNewSavingsAccountForm.get('apply_tds')?.setValue(this.selectedProductData.apply_tds);
      this.addNewSavingsAccountForm.get('tds_gl_account_id')?.setValue(this.selectedProductData.tds_gl_account_id);
    });
  }
  getBranchData() {
    this.api.get(ApiRoutes.branchMaster, { page: 1, size: 500 }).subscribe((response) => {
      this.branchData = response.payload.data;
    });
  }
  clientSelected(data: any) {
    this.addNewSavingsAccountForm = new FormGroup({});
    if (data && data.id) {
      console.log(data);
      this.selectedId = data.id;
      this.getSavingProductData();
      this.getBranchData();
      this.getCodeData();
      this.getCityData();
      this.getGLAccount();
      this.createAddFdProductInformationForm();
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }
  getGLAccount() {
    this.api
      .get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' })
      .subscribe((response) => {
        this.glAccData = response.payload.data;
      });
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
  onAdd(data: any, key: any) {
    if (key === 1) {
      this.showTable1 = false;
      this.addNewSavingsAccountForm.get('nominee_cif_id')?.setValue(data.id);
      this.api.get(ApiRoutes.clientMaster, {}, data.id).subscribe((response) => {
        const DisplayValue = response.payload.data[0];
        if (DisplayValue !== null) {
          this.addNewSavingsAccountForm.get('nominee_name')?.setValue(DisplayValue.account_name);
          this.addNewSavingsAccountForm.get('address1')?.setValue(DisplayValue.address1);
          this.addNewSavingsAccountForm.get('address2')?.setValue(DisplayValue.address2);
          this.addNewSavingsAccountForm.get('address3')?.setValue(DisplayValue.address3);
          this.addNewSavingsAccountForm.get('address4')?.setValue(DisplayValue.address4);
          this.addNewSavingsAccountForm.get('city_id')?.setValue(DisplayValue.city_id);
          this.addNewSavingsAccountForm.get('pin_code')?.setValue(DisplayValue.pin_code);
          this.addNewSavingsAccountForm.get('mobile_no')?.setValue(DisplayValue.mobile_no);
          this.addNewSavingsAccountForm.get('birth_date')?.setValue(DisplayValue.birth_date);
          this.addNewSavingsAccountForm.get('relation_id')?.setValidators(Validators.required);
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
  getSavingProductData() {
    this.api.get(ApiRoutes.savingProductData, { page: 1, size: 500 }).subscribe((response) => {
      this.savingsProductData = response.payload.data;
    });
  }
  getCityData() {
    this.api.get(ApiRoutes.cityList, { page: 1, size: 1500 }).subscribe((response) => {
      this.cityData = response.payload.data;
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
  onSubmit() {
    if (this.addNewSavingsAccountForm.valid) {
      this.addNewSavingsAccountForm.value.vouName = 'saving_account';
      this.addNewSavingsAccountForm.value.EType = 'Add';
      this.addNewSavingsAccountForm.value.cif_id = this.selectedId;
      this.addNewSavingsAccountForm.value.birth_date = moment(this.addNewSavingsAccountForm.value.birth_date).format('YYYY-MM-DD');
      this.addNewSavingsAccountForm.value.nomination_date = moment(this.addNewSavingsAccountForm.value.nomination_date).format(
        'YYYY-MM-DD'
      );
      this.addNewSavingsAccountForm.value.submittedon_date = moment(this.addNewSavingsAccountForm.value.submittedon_date).format(
        'YYYY-MM-DD'
      );
      this.addNewSavingsAccountForm.value.cif_id = this.selectedId;
      const NomineeData = {
        nominee_cif_id: this.addNewSavingsAccountForm.value.nominee_cif_id,
        nominee_name: this.addNewSavingsAccountForm.value.nominee_name,
        address1: this.addNewSavingsAccountForm.value.address1,
        address2: this.addNewSavingsAccountForm.value.address2,
        address3: this.addNewSavingsAccountForm.value.address3,
        address4: this.addNewSavingsAccountForm.value.address4,
        mobile_no: this.addNewSavingsAccountForm.value.mobile_no,
        city_id: this.addNewSavingsAccountForm.value.city_id,
        pin_code: this.addNewSavingsAccountForm.value.pin_code,
        relation_id: this.addNewSavingsAccountForm.value.relation_id,
        birth_date: this.addNewSavingsAccountForm.value.birth_date,
        nomination_date: this.addNewSavingsAccountForm.value.nomination_date,
        guardian_name: this.addNewSavingsAccountForm.value.guardian_name,
        remarks: this.addNewSavingsAccountForm.value.remarks
      };
      this.addNewSavingsAccountForm.value.NomineeData.push(NomineeData);
      let JointAccData = [];
      for (let j = 0; j < this.accHolderTableArray.length; j++) {
        JointAccData.push({
          joinee_cif_id: this.accHolderTableArray[j].joinee_cif_id
            ? this.accHolderTableArray[j].joinee_cif_id
            : this.accHolderTableArray[j].id
        });
      }
      if (this.addNewSavingsAccountForm.get('account_owner_type')?.value == 90) {
        JointAccData = [];
      }
      this.addNewSavingsAccountForm.value['JointAccData'] = JointAccData;

      this.api.post(ApiRoutes.savingAccountData, this.addNewSavingsAccountForm.value).subscribe((res) => {});
    }
  }
}
