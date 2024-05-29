import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { BASE, InverseStatusList, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { AppTable } from 'src/app/core/models/table.model';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-taluka',
  templateUrl: './add-taluka.component.html',
  styleUrls: ['./add-taluka.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddTalukaComponent {
  mode: 'Add' | 'Edit' = 'Add';
  talukaForm!: FormGroup;
  talukaData: any;
  statusList = StatusList;
  inverseStatusList = InverseStatusList;
  pager = new AppTable();
  stateList: any[] = [];
  countryList: any[] = [];
  districtList: any[] = [];
  newLabelName: any = {};
  oldLabelName: any = {};

  talukaLanguageLabel: any;
  currentLang: any = null;
  talukaLanguage!: any;
  talukaLanguageLabels: any = [];

  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {
    this.getJSON();
  }

  ngOnInit() {
    this.talukaData = this.config ? this.config.data : null;
    if (this.talukaData) {
      this.fetchState({ value: this.talukaData.country_id });
      this.fetchDistrict({ value: this.talukaData.state_id });
    }
    this.createDistrictForm();
    this.fetchCounty();
  }

  createDistrictForm() {
    this.talukaForm = <FormGroup>new FormGroup({
      taluka_name: new FormControl(null, [Validators.required]),
      in_native: new FormControl(null, Validators.required),
      country_id: new FormControl(0, Validators.required),
      state_id: new FormControl(0, Validators.required),
      district_id: new FormControl(0, Validators.required),
      is_deactivated: new FormControl(0),
      is_locked: new FormControl(0)
    });

    if (!!this.config.data) {
      this.talukaForm.patchValue(this.config.data);
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
  }
  countryChanged(event: any) {
    this.talukaForm.get('state_id')?.setValue(null);
    this.talukaForm.get('district_id')?.setValue(null);
    this.stateList = [];
    this.districtList = [];
    this.fetchState(event);
  }

  fetchCounty() {
    this.api.get(ApiRoutes.countryMaster, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.countryList = res.payload.data;
    });
  }
  fetchDistrict(event: any) {
    this.api.get(ApiRoutes.districtMaster, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.districtList = res.payload.data;
      if (event !== null) {
        this.districtList = this.districtList.filter((i: any) => i.state_id === event.value);
      }
    });
  }
  fetchState(event: any) {
    this.api.get(ApiRoutes.stateMater, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.stateList = res.payload.data;
      if (event !== null) {
        this.stateList = this.stateList.filter((i: any) => i.country_id === event.value);
      }
    });
  }
  stateChanged(event: any) {
    this.talukaForm.get('district_id')?.setValue(null);
    this.districtList = [];
    this.fetchDistrict(event);
  }

  @Debounce(300)
  onSubmit() {
    if (!this.talukaForm.valid) {
      return;
    }

    const body = {
      taluka_name: this.talukaForm.value.taluka_name,
      in_native: this.talukaForm.value.in_native,
      country_id: this.talukaForm.value.country_id,
      state_id: this.talukaForm.value.state_id,
      district_id: this.talukaForm.value.district_id,
      is_deactivated: this.talukaForm.value.is_deactivated,
      is_locked: this.talukaForm.value.is_locked,
      vouName: 'taluka_entry',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.talukaMaster, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.talukaForm.value).forEach((i: any) => {
        if (this.talukaForm.value[i] !== this.talukaData[i] && this.talukaData[i] !== undefined) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.talukaForm.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.talukaData[i];
          UpdateValueObj[i] = this.talukaForm.value[i];
        }
      });
      // NewValueObj['vouName'] = this.talukaForm.value['vouName'] || 'taluka_entry';
      // UpdateValueObj['vouName'] = this.talukaForm.value['vouName'] || 'taluka_entry';

      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      let finalForm = { ...updatesObj, ...body };
      delete finalForm?.id;
      console.log(finalForm);
      this.api.put(ApiRoutes.talukaMaster, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }

  getJSON() {
    this.api.getJson('assets/json/dist-taluka-city-language.json').subscribe((data) => {
      this.talukaLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.talukaLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.talukaLanguageLabels = Object.keys(this.talukaLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    if (this.talukaLanguage?.[this.currentLang] && this.talukaLanguage?.[this.currentLang][label]) {
      return this.talukaLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
