import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { BASE, LengthList, NumberingMethod, PhysicalYearPrefix, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-number-preference',
  templateUrl: './add-number-preference.component.html',
  styleUrls: ['./add-number-preference.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddNumberPreferenceComponent implements OnInit {
  mode: 'Add' | 'Edit' = 'Add';
  addNewNumberMasterForm!: FormGroup;
  numMasterData: any;
  numList: any;
  NumberingMethod = NumberingMethod;
  StatusList = StatusList;
  prefix_type = PhysicalYearPrefix;
  lengthList = LengthList;
  branchData: any;
  newLabelName: any = {};
  oldLabelName: any = {};
  commonNumber: any;
  voucherData: any;
  showBranch = false;
  numMasterLanguageLabel: any;
  currentLang: any = null;
  numMasterLanguage: any;
  numMasterLanguageLabels: any = [];
  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {
    this.getJSON();
  }
  ngOnInit(): void {
    this.numMasterData = this.config ? this.config.data : null;

    this.fetchNumlist();
    this.createAddNewNumberMasterForm();
    if (this.numMasterData) {
      if (this.numMasterData.branch_id !== null) {
        this.showBranch = true;
      }
      this.getBranchData();
      this.getCommonNumber();
      this.getNumberingMethod(this.numMasterData['method_of_numbering']);
    }
  }
  getBranchData() {
    this.api.get(ApiRoutes.branchMaster, { page: 1, size: 500 }).subscribe((response) => {
      this.branchData = response.payload.data;
    });
  }
  verifyVoucher(event: any) {
    const selectedNumId = this.numList.find((Number: any) => Number.id === event.value);
    if (selectedNumId.voucher_ids !== null) {
      this.showBranch = true;
      if (!this.branchData) {
        this.getBranchData();
      }
    }
  }
  createAddNewNumberMasterForm() {
    this.addNewNumberMasterForm = new FormGroup({
      number_id: new FormControl(null),
      branch_id: new FormControl(null),
      is_deactivated: new FormControl(0),
      common_no_id: new FormControl(null),
      method_of_numbering: new FormControl(null),
      number_start_from: new FormControl(null),
      total_length: new FormControl(null),
      prefill_with_zero: new FormControl(0),
      fix_prefix: new FormControl(0),
      prefix_text: new FormControl(null),
      allow_duplicate: new FormControl(null)
    });
    if (this.config.data) {
      this.addNewNumberMasterForm.patchValue(this.config.data);
      this.mode = 'Edit';
    }
  }
  fetchNumlist() {
    this.api.get(ApiRoutes.numMaster, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.numList = res.payload.data;
    });
  }
  getCommonNumber() {
    this.api
      .get(ApiRoutes.commonNumber, { page: 1, size: 500 }, 0, {
        number_nature: this.numMasterData.number_nature,
        branch_id: this.numMasterData.branch_id
      })
      .subscribe((response) => {
        this.commonNumber = response.payload.data;
      });
  }
  getNumberingMethod(value: any) {
    if (value.value === 3) {
      if (value.value === 3 && this.commonNumber === null) {
        this.getCommonNumber();
      }
    }
  }
  @Debounce(300)
  onSubmit() {
    if (!this.addNewNumberMasterForm.valid) {
      return;
    }
    const body = {
      ...this.addNewNumberMasterForm.value,
      EType: this.mode,
      ...(this.config.data?.id && { id: this.config.data.id }),
      vouName: 'number_preference'
    };
    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.numMaster, body).subscribe((res) => {
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.addNewNumberMasterForm.value).forEach((i: any) => {
        if (this.addNewNumberMasterForm.value[i] !== this.numMasterData[i] && this.numMasterData[i] !== undefined) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.addNewNumberMasterForm.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.numMasterData[i];
          UpdateValueObj[i] = this.addNewNumberMasterForm.value[i];
        }
      });
      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      let finalForm = { ...updatesObj, ...body };
      delete finalForm?.id;

      this.api.put(ApiRoutes.numMaster, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }
  getJSON() {
    this.api.getJson('assets/json/number-preference-language.json').subscribe((data) => {
      this.numMasterLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.numMasterLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.numMasterLanguageLabels = Object.keys(this.numMasterLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    if (this.numMasterLanguage?.[this.currentLang] && this.numMasterLanguage?.[this.currentLang][label]) {
      return this.numMasterLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
