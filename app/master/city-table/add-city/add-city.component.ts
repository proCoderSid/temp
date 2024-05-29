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
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddCityComponent {
  mode: 'Add' | 'Edit' = 'Add';
  cityForm!: FormGroup;
  statusList = StatusList;
  inverseStatusList = InverseStatusList;
  pager = new AppTable();
  stateList: any[] = [];
  countryList: any[] = [];
  districtList: any[] = [];
  talukaList: any[] = [];
  cityData: any;
  cityLanguageLabel: any;
  currentLang: any = null;
  cityLanguage!: any;
  cityLanguageLabels: any = [];
  newLabelName: any = {};
  oldLabelName: any = {};

  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {
    this.getJSON();
  }

  ngOnInit() {
    console.log(this.config.data);
    this.cityData = this.config ? this.config.data : null;

    if (this.cityData) {
      this.fetchState({ value: this.cityData.country_id });
      this.fetchTaluka({ value: this.cityData.district_id });
      this.fetchDistrict({ value: this.cityData.state_id });
    }

    this.fetchCounty();
    this.createDistrictForm();
  }
  createDistrictForm() {
    this.cityForm = <FormGroup>new FormGroup({
      city_name: new FormControl(null, [Validators.required]),
      in_native: new FormControl(null, Validators.required),
      pin_code: new FormControl(null, Validators.required),
      country_id: new FormControl(0, Validators.required),
      state_id: new FormControl(0, Validators.required),
      district_id: new FormControl(0, Validators.required),
      taluka_id: new FormControl(0, Validators.required),
      is_deactivated: new FormControl(0),
      is_locked: new FormControl(0)
    });

    if (!!this.config.data) {
      this.cityForm.patchValue(this.config.data);
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
  }
  fetchCounty() {
    this.api.get(ApiRoutes.countryMaster, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.countryList = res.payload.data;
    });
  }
  fetchDistrict(event: any) {
    this.api.get(ApiRoutes.districtMaster, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.districtList = res.payload.data;
      console.log(this.districtList, 'd');
      if (event !== null) {
        this.districtList = this.districtList.filter((i: any) => i.state_id === event.value);
      }
    });
  }
  fetchState(event: any) {
    console.log(event.value);

    this.api.get(ApiRoutes.stateMater, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.stateList = res.payload.data;
      if (event !== null) {
        this.stateList = this.stateList.filter((i: any) => i.country_id === event.value);
      }
    });
  }
  fetchTaluka(event: any) {
    this.api.get(ApiRoutes.talukaMaster, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.talukaList = res.payload.data;
      console.log(this.talukaList, 't');
      if (event !== null) {
        this.talukaList = this.talukaList.filter((i: any) => i.district_id === event.value);
      }
      console.log(this.talukaList);
    });
  }
  countryChanged(event: any) {
    this.cityForm.get('state_id')?.setValue(null);
    this.cityForm.get('district_id')?.setValue(null);
    this.cityForm.get('taluka_id')?.setValue(null);
    this.stateList = [];
    this.districtList = [];
    this.talukaList = [];
    this.fetchState(event);
  }

  stateChanged(event: any) {
    this.cityForm.get('district_id')?.setValue(null);
    this.cityForm.get('taluka_id')?.setValue(null);
    this.districtList = [];
    this.talukaList = [];
    this.fetchDistrict(event);
  }

  districtChanged(event: any) {
    this.cityForm.get('taluka_id')?.setValue(null);
    this.talukaList = [];
    this.fetchTaluka(event);
  }
  getJSON() {
    this.api.getJson('assets/json/dist-taluka-city-language.json').subscribe((data) => {
      this.cityLanguage = data;
      console.log(data);

      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }
  getData() {
    Object.keys(this.cityLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.cityLanguageLabels = Object.keys(this.cityLanguage[keyVal]);
      }
    });
  }
  getLabelLanguage(label: string) {
    if (this.cityLanguage?.[this.currentLang] && this.cityLanguage?.[this.currentLang][label]) {
      return this.cityLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }

  @Debounce(300)
  onSubmit() {
    if (!this.cityForm.valid) {
      return;
    }

    const body = {
      city_name: this.cityForm.value.city_name,
      in_native: this.cityForm.value.in_native,
      pin_code: this.cityForm.value.pin_code,
      country_id: this.cityForm.value.country_id,
      state_id: this.cityForm.value.state_id,
      district_id: this.cityForm.value.district_id,
      is_deactivated: this.cityForm.value.is_deactivated,
      is_locked: this.cityForm.value.is_locked,
      taluka_id: this.cityForm.value.taluka_id,
      vouName: 'city_entry',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.cityMaster, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.cityForm.value).forEach((i: any) => {
        if (this.cityForm.value[i] !== this.cityData[i]) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.cityForm.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.cityData[i];
          UpdateValueObj[i] = this.cityForm.value[i];
        }
      });
      // NewValueObj['vouName'] = this.cityForm.value['vouName'] || 'city_entry';
      // UpdateValueObj['vouName'] = this.cityForm.value['vouName'] || 'city_entry';

      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      let finalForm = { ...updatesObj, ...body };
      delete finalForm?.id;
      this.api.put(ApiRoutes.cityMaster, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }
}
