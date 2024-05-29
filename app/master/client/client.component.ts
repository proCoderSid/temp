import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { mainSearchBy, searchBy } from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ClientComponent implements OnChanges {
  @Input() formType: any;
  @Input() editId: any = 0;
  @Output() selectedClient: EventEmitter<any> = new EventEmitter<any>();
  getAccountForm!: FormGroup;
  clientData: any;
  showTable = false;
  submitAPI: any;
  addAPI: any;
  accType: string = '';
  DisplayData: any;
  showData = false;
  MemberType!: any;
  hideSearchPara = false;
  searchBy = searchBy;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService
  ) {}
  ngOnInit() {
    this.createAccountSearchForm();
    this.apiFormat(this.formType);
    this.getClientData();
    this.getMemeberType();
  }
  createAccountSearchForm() {
    this.getAccountForm = this._fb.group({
      searchBy: new FormControl(null),
      searchValue: new FormControl(null)
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.editId && changes.editId.currentValue !== changes.editId.previousValue) {
      this.getMemeberType();
    }
  }
  getClientData() {
    this.api.get(this.submitAPI, { page: 0, size: 500 }).subscribe((res) => {
      this.clientData = res.payload.data;
      if (this.clientData.length > 0) {
        if (this.clientData[0].SAccNo) {
          this.clientData.map((i: any) => (i['account_no'] = i.SAccNo));
        }
        if (this.clientData[0].RDAccNo) {
          this.clientData.map((i: any) => (i['account_no'] = i.RDAccNo));
        }
      }
    });
  }
  getMemeberType() {
    this.api.get(ApiRoutes.CodeValue, { page: 1, size: 500, codeValues: 'MemberType' }).subscribe((response) => {
      this.MemberType = response.payload.data;
      if (this.editId > 0) {
        this.hideSearchPara = true;
        this.onAdd({ id: this.editId });
      }
    });
  }
  apiFormat(temp: any) {
    console.log(temp);
    if (temp === 'SavAcc') {
      this.submitAPI = ApiRoutes.savingAccountData;
      this.addAPI = ApiRoutes.transactionCIF;
      this.accType = 'Saving';
    } else if (temp === 'RDAcc') {
      this.submitAPI = ApiRoutes.RDAccountData;
      this.addAPI = ApiRoutes.transactionCIF;
      this.accType = 'RD';
    } else if (temp === undefined) {
      this.submitAPI = ApiRoutes.client;
      this.addAPI = ApiRoutes.clientMaster;
      this.searchBy = mainSearchBy;
    } else {
      this.submitAPI = ApiRoutes.client;
      this.addAPI = ApiRoutes.clientMaster;
      this.searchBy = mainSearchBy;
    }
  }
  onAdd(data: any) {
    if (this.editId !== 0) {
    }
    if (Object.keys(data).length > 2) {
      this.selectedClient.emit(data);
      let searchID = data.cif_id ? data.cif_id : data.id;
      let tempObj = { AccId: data.id, AccType: this.accType };
      this.api.get(this.addAPI, this.accType !== '' ? tempObj : {}, this.accType !== '' ? 0 : searchID).subscribe((res) => {
        this.DisplayData = res.payload.data[0];
        if (data.cif_id > 0) {
          this.DisplayData['product_name'] = data.product_name ? data.product_name : null;
          this.DisplayData['cif_acc_no'] = data.CIFNo ? data.CIFNo : data.account_no;
          this.DisplayData['acc_no'] = data.SAccNo ? data.SAccNo : null;
        } else {
          this.DisplayData['product_name'] = this.DisplayData && this.DisplayData.product_name ? this.DisplayData.product_name : null;
          this.DisplayData['cif_acc_no'] =
            this.DisplayData && this.DisplayData.CIFNo ? this.DisplayData.CIFNo : this.DisplayData.account_no;
          this.DisplayData['acc_no'] = this.DisplayData && this.DisplayData.SAccNo ? this.DisplayData.SAccNo : null;
        }
        for (let j = 0; j < this.MemberType.length; j++) {
          if (this.DisplayData.member_type_id === this.MemberType[j].id) {
            this.DisplayData['member_type_name'] = this.MemberType[j].code_value;
          }
        }
        this.showData = true;
        this.showTable = false;
      });
    }
  }
}
