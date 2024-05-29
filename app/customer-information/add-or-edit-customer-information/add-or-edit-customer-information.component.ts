import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { BankAccountTypeList, FatherOrSpouseList, StatusList } from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { PublicService } from 'src/app/core/services/public.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-add-or-edit-customer-information',
  templateUrl: './add-or-edit-customer-information.component.html',
  styleUrls: ['./add-or-edit-customer-information.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AddOrEditCustomerInformationComponent {
  addNewCIFForm!: FormGroup;

  dropdown = {
    yesNoList: StatusList,
    // activeStatus: ActiveStatus,
    // bankAccType: BankAccType,
    // searchBy: searchBy,
    fatherOrSpouseList: FatherOrSpouseList,
    bankAccountTypeList: BankAccountTypeList,
    branchOfficeList: [],
    memberTypeList: [],
    titleList: [],
    relationList: [],
    genderList: [],
    casteList: [],
    subCasteList: [],
    maritalStatusList: [],
    kycDocumentsList: [],
    relativeList: [],
    searchByList: [],
    stateList: [],
    districtList: [],
    talukaList: [],
    cityList: []
  };

  identificationList: Array<any> = [];
  identificationRowIndex?: number = undefined;
  relativeList: Array<any> = [];
  relativeRowIndex?: number = undefined;

  sb: {
    branchOfficeList?: Subscription;
    codeValuesList?: Subscription;
  } = {};

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    public ps: PublicService,
    private ds: DesignService
  ) {}

  ngOnInit() {
    this.createAddCustomerInformationForm();
    this.ds.setBreadcrumbs([{ label: 'Add Customer Information' }]);
    this.ds.setPageTitle('Add Customer Information');
    this.getDropdownList();
  }

  getDropdownList() {
    // get branch office list
    this.sb.branchOfficeList = this.api.get(ApiRoutes.branchMaster, { page: 1, size: 500 }).subscribe({
      next: (success) => {
        this.dropdown.branchOfficeList = success.payload.data;
      },
      error: (err) => {}
    });

    // get Dropdowns List
    this.sb.codeValuesList = this.api
      .get(ApiRoutes.CodeValue, {
        page: 1,
        size: 500,
        codeValues: 'Title,RelationID,MemberType,Gender,Caste,SubCaste,MaritalStatus,KycDocuments'
      })
      .subscribe((response) => {
        this.dropdown.memberTypeList = response.payload.data.filter((i: any) => i.code_name === 'MemberType');
        this.dropdown.titleList = response.payload.data.filter((i: any) => i.code_name === 'Title');
        this.dropdown.relationList = response.payload.data.filter((i: any) => i.code_name === 'RelationID');
        this.dropdown.genderList = response.payload.data.filter((i: any) => i.code_name === 'Gender');
        this.dropdown.casteList = response.payload.data.filter((i: any) => i.code_name === 'Caste');
        this.dropdown.subCasteList = response.payload.data.filter((i: any) => i.code_name === 'SubCaste');
        this.dropdown.maritalStatusList = response.payload.data.filter((i: any) => i.code_name === 'MaritalStatus');
        this.dropdown.kycDocumentsList = response.payload.data.filter((i: any) => i.code_name === 'KycDocuments');
      });

    // get city list
    this.sb.codeValuesList = this.api.get(ApiRoutes.cityList, { page: 1, size: 1500 }).subscribe(
      {
        next: (success) => {
          this.dropdown.cityList = success.payload.data;
        },
        error: (error) => {}
      }
      // (response) => {

      // this.dropdown.cityList = response.payload.data;
      // if (this.ps.hasValue(this.dropdown.cityList)) {
      //   let tempArray = this.cityData.filter((i: any) => i.id === this.cifData['NomineeData'][0]['city_id']);
      //   this.labelData2 = {
      //     taluka_name: tempArray[0]['taluka_name'],
      //     district_name: tempArray[0]['district_name'],
      //     state_name: tempArray[0]['state_name']
      //   };
      // }
      // if (this.cifData !== undefined && this.cityData.length > 0) {
      //   let tempArray = this.cityData.filter((i: any) => i.id === this.cifData['city_id']);
      //   this.labelData1 = {
      //     taluka_name: tempArray[0]['taluka_name'],
      //     district_name: tempArray[0]['district_name'],
      //     state_name: tempArray[0]['state_name']
      //   };
      // }
      // }
    );
  }

  createAddCustomerInformationForm() {
    this.addNewCIFForm = this._fb.group({
      branch_id: new FormControl(null, Validators.required),
      account_no: new FormControl(null),
      is_deactivated: new FormControl(null),
      member_type_id: new FormControl(null, Validators.required),
      join_date: new FormControl(new Date().toISOString().substring(0, 10), Validators.required),
      title: new FormControl(null, Validators.required),
      first_name: new FormControl(null, [Validators.required]),
      middle_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      in_native: new FormControl(null),
      resolution_no: new FormControl(null),
      resolution_date: new FormControl(null),
      father_spouse_name: new FormControl(null),
      relation_name: new FormControl(null),
      mother_name: new FormControl(null),
      gender_id: new FormControl(null, Validators.required),
      caste_id: new FormControl(null, Validators.required),
      sub_caste_id: new FormControl(null, Validators.required),
      birth_date: new FormControl(null, Validators.required),
      marital_status_id: new FormControl(null, Validators.required),
      business: new FormControl(null),
      education: new FormControl(null),
      employee_no: new FormControl(null),
      retired_date: new FormControl(null),
      remarks: new FormControl(null),
      address1: new FormControl(null),
      address2: new FormControl(null),
      address3: new FormControl(null),
      address4: new FormControl(null),
      city_id: new FormControl(null, Validators.required),
      pin_code: new FormControl(null),
      mobile_no: new FormControl(null, [Validators.required]),
      phone1: new FormControl(null),
      phone2: new FormControl(null),
      phoneR: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
      bank_branch_id: new FormControl(null),
      bank_account_number: new FormControl(null),
      bank_account_type: new FormControl(null),
      no_of_kyc_required: new FormControl(1),
      kyc_document_id: new FormControl(),
      kyc_number: new FormControl(null),
      kyc_issued_date: new FormControl(new Date().toISOString().substring(0, 10)),
      search_by: new FormControl('account_name'),
      search_value: new FormControl(),
      relation_id: new FormControl(),
      nominee_cif_id: new FormControl(null),
      nominee_name: new FormControl(null, [Validators.required]),
      nominee_address1: new FormControl(null),
      nominee_address2: new FormControl(null),
      nominee_address3: new FormControl(null),
      nominee_address4: new FormControl(null),
      nominee_state_id: new FormControl(null, Validators.required),
      nominee_district_id: new FormControl(null, Validators.required),
      nominee_taluka_id: new FormControl(null, Validators.required),
      nominee_city_id: new FormControl(null, Validators.required),
      nominee_pin_code: new FormControl(null),
      nominee_mobile_no: new FormControl(null),
      nominee_relation_id: new FormControl(null),
      nominee_birth_date: new FormControl(null),
      is_minor: new FormControl(0),
      nomination_date: new FormControl(null),
      guardian_name: new FormControl(null),
      nominee_remarks: new FormControl(null),
      AddressData: new FormArray([]),
      BankData: new FormArray([]),
      KYCData: new FormArray([]),
      RelativesData: new FormArray([]),
      NomineeData: new FormArray([])
    });
  }

  onSubmit() {
    this.addNewCIFForm.markAllAsTouched();
    if (!this.addNewCIFForm.valid) {
      return;
    }
  }

  onAddIdentification() {
    if (
      !this.addNewCIFForm.get('kyc_document_id')?.value ||
      !this.addNewCIFForm.get('kyc_number')?.value ||
      !this.addNewCIFForm.get('kyc_issued_date')?.value
    ) {
      return;
    }

    const id = {
      kyc_document_id: this.addNewCIFForm.get('kyc_document_id')?.value?.id,
      kyc_document_name: this.addNewCIFForm.get('kyc_document_id')?.value?.code_value,
      kyc_number: this.addNewCIFForm.get('kyc_number')?.value,
      kyc_issued_date: this.addNewCIFForm.get('kyc_issued_date')?.value
    };

    console.log(id);

    if (this.identificationRowIndex === undefined) {
      this.identificationList.push(id);
      this.onClearIdentification();
    } else {
      this.identificationList[this.identificationRowIndex] = id;
    }
  }

  onDeleteIdentification(index: any) {
    this.identificationList.splice(index, 1);
  }

  onEditIdentification(rowIndex: number, data: any) {
    if (
      !this.addNewCIFForm.get('kyc_document_id')?.value ||
      !this.addNewCIFForm.get('kyc_number')?.value ||
      !this.addNewCIFForm.get('kyc_issued_date')?.value
    ) {
      return;
    }

    this.identificationRowIndex = rowIndex;
    this.addNewCIFForm.get('kyc_issued_date')?.setValue(data.kyc_issued_date);
    this.addNewCIFForm.get('kyc_document_id')?.setValue(data.kyc_document_id);
    this.addNewCIFForm.get('kyc_number')?.setValue(data.kyc_number);
    this.addNewCIFForm.get('kyc_document_id')?.disable();
  }

  onClearIdentification() {
    this.addNewCIFForm.get('kyc_issued_date')?.setValue(null);
    this.addNewCIFForm.get('kyc_document_id')?.setValue(null);
    this.addNewCIFForm.get('kyc_number')?.setValue(null);
    this.addNewCIFForm.get('kyc_document_id')?.enable();
  }

  onAddRelative() {
    const id = {
      search_by: this.addNewCIFForm.get('search_by')?.value,
      search_value: this.addNewCIFForm.get('search_value')?.value,
      relation_id: this.addNewCIFForm.get('relation_id')?.value
    };

    if (this.relativeRowIndex === undefined) {
      this.relativeList.push(id);
      this.onClearRelative();
    } else {
      this.relativeList[this.relativeRowIndex] = id;
    }
  }

  onDeleteRelative(index: any) {
    this.relativeList.splice(index, 1);
  }

  onEditRelative(rowIndex: number, data: any) {
    this.relativeRowIndex = rowIndex;
    this.addNewCIFForm.get('search_by')?.setValue(data.search_by);
    this.addNewCIFForm.get('search_value')?.setValue(data.search_by);
    this.addNewCIFForm.get('relation_id')?.setValue(data.search_by);
    this.addNewCIFForm.get('search_by')?.disable();
  }

  onClearRelative() {
    this.addNewCIFForm.get('search_by')?.setValue(null);
    this.addNewCIFForm.get('search_value')?.setValue(null);
    this.addNewCIFForm.get('relation_id')?.setValue(null);
    this.addNewCIFForm.get('search_by')?.enable();
  }

  focusTrap(event: any, control: any) {
    if (control.control.invalid) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  onEditCity(e: any) {
    console.log(e);
  }

  onDropdownTableClick(event: any, dropdown: Dropdown, data: any, eventType: 'click' | 'dblclick') {
    event.preventDefault();
    event.stopImmediatePropagation();
    dropdown.writeValue(data[dropdown?.optionValue || 'value']);
    if (eventType === 'dblclick') {
      dropdown.hide();
    }
  }
}
