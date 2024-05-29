import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { BASE, InverseStatusList, StatusList, StatusYNList } from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-branch-list',
  templateUrl: './add-branch-list.component.html',
  styleUrls: ['./add-branch-list.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddBranchListComponent {
  mode: 'Add' | 'Edit' = 'Add';
  addNewBranchForm!: FormGroup;
  branchData: any;
  branchId: number = 0;
  yesNoList = StatusList;
  InverseStatusList = InverseStatusList;
  testId = StatusYNList;
  GLAccountData: any[] = [];
  identificationList: Array<any> = [];
  identificationRowIndex?: number = undefined;
  cityList: any[] = [];
  newLabelName: any = {};
  oldLabelName: any = {};

  currentLang: any = null;
  branchLanguage: any;
  branchLanguageLabels: any = [];

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private _sharedService: SharedService
  ) {
    this.getJSON();
  }

  ngOnInit() {
    this.branchId = this._sharedService.getbranchId();
    this.fetchCityList();
    this.getGlData();
    if (Number(this.branchId) > 0) {
      this.mode = 'Edit';
      this.getBranchData(this.branchId);
      this.createAddNewBranchForm();
    } else {
      this.createAddNewBranchForm();
    }
  }

  createAddNewBranchForm() {
    this.addNewBranchForm = this._fb.group({
      branch_name: new FormControl(this.branchData ? this.branchData.branch_name : null, [Validators.required]),
      branch_code: new FormControl(this.branchData ? this.branchData.branch_code : null, [Validators.required]),
      parent_id: new FormControl(this.branchData && this.branchData.parent_id ? this.branchData.parent_id : 0),
      external_id: new FormControl(this.branchData && this.branchData.external_id ? this.branchData.external_id : 0),
      opening_date: new FormControl(this.branchData ? this.branchData.opening_date : null, [Validators.required]),
      ifsc_no: new FormControl(this.branchData ? this.branchData.ifsc_no : null),
      address1: new FormControl(this.branchData ? this.branchData.address1 : null),
      address2: new FormControl(this.branchData ? this.branchData.address2 : null),
      address3: new FormControl(this.branchData ? this.branchData.address3 : null),
      address4: new FormControl(this.branchData ? this.branchData.address4 : null),
      city_id: new FormControl(this.branchData ? Number(this.branchData.city_id) : null),
      mobile1: new FormControl(this.branchData ? this.branchData.mobile1 : null),
      mobile2: new FormControl(this.branchData ? this.branchData.mobile2 : null),
      phone1: new FormControl(this.branchData ? this.branchData.phone1 : null),
      phone2: new FormControl(this.branchData ? this.branchData.phone2 : null),
      email: new FormControl(this.branchData ? this.branchData.email : null),
      is_ho_branch: new FormControl(this.branchData ? this.branchData.is_ho_branch : null),
      cash_gl_account_id: new FormControl(this.branchData ? this.branchData.cash_gl_account_id : null),
      cheque_gl_account_id: new FormControl(this.branchData ? this.branchData.cheque_gl_account_id : null),
      is_denomination_required: new FormControl(this.branchData ? this.branchData.is_denomination_required : 0),
      is_deactivated: new FormControl(this.branchData ? this.branchData.is_deactivated : 0),
      is_locked: new FormControl(this.branchData ? this.branchData.is_locked : 0)
    });
  }
  getBranchData(id: any) {
    this.api.get(ApiRoutes.branchMaster, {}, id).subscribe((response) => {
      this.branchData = response.payload.data;
      this.createAddNewBranchForm();
      this._sharedService.setbranchId(0);
    });
  }
  fetchCityList() {
    this.api.get(ApiRoutes.cityMaster, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.cityList = res.payload.data;
    });
  }
  getGlData() {
    this.api.get(ApiRoutes.GlAccMasterData, { page: 1, size: 500, accValues: 'CA,BK,LA,IN,CS,CL,PT,SHR,SAVI,REC' }).subscribe((res) => {
      this.GLAccountData = res.payload.data;
    });
  }

  onSubmit() {
    if (this.addNewBranchForm) {
      this.addNewBranchForm.value['vouName'] = 'branch_entry';
      if (this.mode == 'Edit') {
        this.addNewBranchForm.value['EType'] = 'Edit';
        let NewValueObj: any = {};
        let OldValueObj: any = {};
        let UpdateValueObj: any = {};
        Object.keys(this.addNewBranchForm.value).forEach((i: any) => {
          if (this.addNewBranchForm.value[i] !== this.branchData[i] && this.branchData[i] !== undefined) {
            NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.addNewBranchForm.value[i];
            OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.branchData[i];
            UpdateValueObj[i] = this.addNewBranchForm.value[i];
          }
        });
        let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
        let finalForm = { ...updatesObj, ...this.addNewBranchForm.value };

        console.log(finalForm);
        this.api.put(ApiRoutes.branchMaster, this.branchData.id, finalForm).subscribe((res) => {
          setTimeout(() => {}, 0);
        });
      } else {
        this.addNewBranchForm.value['EType'] = 'Add';
        this.api.post(ApiRoutes.branchMaster, this.addNewBranchForm.value).subscribe((res) => {
          setTimeout(() => {}, 0);
        });
      }
    }
  }
  getJSON() {
    this.api.getJson('assets/json/branch-language.json').subscribe((data) => {
      this.branchLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.branchLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.branchLanguageLabels = Object.keys(this.branchLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    if (this.branchLanguage?.[this.currentLang] && this.branchLanguage?.[this.currentLang][label]) {
      return this.branchLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
