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
  selector: 'app-add-district',
  templateUrl: './add-district.component.html',
  styleUrls: ['./add-district.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddDistrictComponent {
  mode: 'Add' | 'Edit' = 'Add';
  districtForm!: FormGroup;
  districtData: any;
  statusList = StatusList;
  inverseStatusList = InverseStatusList;
  pager = new AppTable();
  stateList: any[] = [];
  countryList: any[] = [];
  newLabelName: any = {};
  oldLabelName: any = {};

  districtLanguageLabel: any;
  currentLang: any = null;
  districtLanguage!: any;
  districtLanguageLabels: any = [];

  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.districtData = this.config ? this.config.data : null;
    if (this.districtData) {
      this.fetchState({ value: this.districtData.country_id });
    }
    this.createDistrictForm();
    this.fetchCounty();
  }
  createDistrictForm() {
    this.districtForm = <FormGroup>new FormGroup({
      district_name: new FormControl(null, [Validators.required]),
      in_native: new FormControl(null, Validators.required),
      country_id: new FormControl(0, Validators.required),
      state_id: new FormControl(0, Validators.required),
      is_deactivated: new FormControl(0),
      is_locked: new FormControl(0)
    });

    if (!!this.config.data) {
      this.districtForm.patchValue(this.config.data);
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
  countryChanged(event: any) {
    this.districtForm.get('state_id')?.setValue(null);
    this.stateList = [];
    this.fetchState(event);
  }
  fetchState(event: any) {
    this.api.get(ApiRoutes.stateMater, { page: 1, size: BASE.DEFAULT_SIZE_2000 }).subscribe((res) => {
      this.stateList = res.payload.data;
      if (event !== null) {
        this.stateList = this.stateList.filter((i: any) => i.country_id === event.value);
      }
    });
  }

  @Debounce(300)
  onSubmit() {
    if (!this.districtForm.valid) {
      return;
    }

    const body = {
      district_name: this.districtForm.value.district_name,
      in_native: this.districtForm.value.in_native,
      country_id: this.districtForm.value.country_id,
      state_id: this.districtForm.value.state_id,
      is_deactivated: this.districtForm.value.is_deactivated,
      is_locked: this.districtForm.value.is_locked,
      vouName: 'district_entry',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.districtMaster, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      this.districtForm.controls;
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.districtForm.value).forEach((i: any) => {
        if (this.districtForm.value[i] !== this.districtData[i] && this.districtData[i] !== undefined) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.districtForm.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.districtData[i];
          UpdateValueObj[i] = this.districtForm.value[i];
        }
      });
      // NewValueObj['vouName'] = this.districtForm.value['vouName'] || 'district_entry';
      // UpdateValueObj['vouName'] = this.districtForm.value['vouName'] || 'district_entry';
      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      let finalForm = { ...updatesObj, ...body };
      delete finalForm?.id;
      console.log(finalForm);
      this.api.put(ApiRoutes.districtMaster, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }

  getJSON() {
    this.api.getJson('assets/json/dist-taluka-city-language.json').subscribe((data) => {
      this.districtLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.districtLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.districtLanguageLabels = Object.keys(this.districtLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    if (this.districtLanguage?.[this.currentLang] && this.districtLanguage?.[this.currentLang][label]) {
      return this.districtLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
