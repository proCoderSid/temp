import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { InverseStatusList, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-or-edit-code',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-or-edit-code.component.html',
  styleUrls: ['./add-or-edit-code.component.scss']
})
export class AddOrEditCodeComponent {
  mode: 'Add' | 'Edit' = 'Add';
  addNewCodeForm!: FormGroup;
  codeData: any;

  statusList = StatusList;
  inverseStatusList = InverseStatusList;
  newLabelName: any = {};
  oldLabelName: any = {};

  codeLanguageLabel: any;
  currentLang: any = null;
  codeLanguage: any;
  codeLanguageLabels: any = [];

  constructor(
    private api: ApiService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private _sharedService: SharedService
  ) {
    this.getJSON();
  }

  ngOnInit(): void {
    this.codeData = this.config ? this.config.data : null;
    this.createAddNewCodeForm();
  }

  createAddNewCodeForm() {
    console.log(this.config.data);

    this.addNewCodeForm = <FormGroup>new FormGroup({
      code_name: new FormControl(null, [Validators.required]),
      is_deactivated: new FormControl(0),
      is_mandatory: new FormControl(0),
      is_locked: new FormControl(0)
    });

    if (!!this.config.data) {
      this.addNewCodeForm.patchValue(this.config.data);
      this.mode = 'Edit';
    } else {
      this.mode = 'Add';
    }
  }

  @Debounce(300)
  onSubmit() {
    if (!this.addNewCodeForm.valid) {
      return;
    }
    console.log('test');

    const body = {
      code_name: this.addNewCodeForm.value.code_name,
      is_deactivated: this.addNewCodeForm.value.is_deactivated,
      is_mandatory: this.addNewCodeForm.value.is_mandatory,
      is_locked: this.addNewCodeForm.value.is_locked,
      vouName: 'code_entry',
      EType: this.mode,
      ...(this.config?.data?.id && { id: this.config.data.id })
    };

    if (this.mode === 'Add') {
      this.api.post(ApiRoutes.codeMaster, body).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    } else if (this.mode === 'Edit') {
      if (this.codeData?.is_system === 1) {
        this.addNewCodeForm.value.code_name = this.codeData['code_name'];
      }
      let NewValueObj: any = {};
      let OldValueObj: any = {};
      let UpdateValueObj: any = {};
      Object.keys(this.addNewCodeForm.value).forEach((i: any) => {
        if (this.addNewCodeForm.value[i] !== this.codeData[i]) {
          NewValueObj[this.getLabelLanguage(i)] = this.newLabelName[i] ? this.newLabelName[i] : this.addNewCodeForm.value[i];
          OldValueObj[this.getLabelLanguage(i)] = this.oldLabelName[i] ? this.oldLabelName[i] : this.codeData[i];
          UpdateValueObj[i] = this.addNewCodeForm.value[i];
        }
      });
      NewValueObj['vouName'] = this.addNewCodeForm.value['vouName'] || 'code_entry';
      UpdateValueObj['vouName'] = this.addNewCodeForm.value['vouName'] || 'code_entry';

      let updatesObj = { New: NewValueObj, Old: OldValueObj, Update: UpdateValueObj };
      const { id, ...bodyWithoutId } = body;
      let finalForm = { ...updatesObj, ...bodyWithoutId };
      this.api.put(ApiRoutes.codeMaster, body.id, finalForm).subscribe((res) => {
        console.log('response', res);
        setTimeout(() => {
          this.ref.close(true);
        }, 0);
      });
    }
  }
  getJSON() {
    this.api.getJson('assets/json/code-language.json').subscribe((data) => {
      this.codeLanguage = data;
      this.getData();
      this._sharedService.getEnvLanguage().subscribe((res) => {
        //console.log(res);

        this.currentLang = res === null ? 'English' : res;
      });
    });
  }

  getData() {
    Object.keys(this.codeLanguage).forEach((keyVal) => {
      if (keyVal === 'English') {
        this.codeLanguageLabels = Object.keys(this.codeLanguage[keyVal]);
      }
    });
  }

  getLabelLanguage(label: string) {
    //console.log(this.currentLang);

    if (this.codeLanguage?.[this.currentLang] && this.codeLanguage?.[this.currentLang][label]) {
      return this.codeLanguage[this.currentLang][label];
    } else {
      return label;
    }
  }
}
