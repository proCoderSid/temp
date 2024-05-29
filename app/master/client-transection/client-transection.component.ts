import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { ApiService } from 'src/app/core/services/api.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-client-transection',
  templateUrl: './client-transection.component.html',
  styleUrls: ['./client-transection.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class ClientTransectionComponent implements OnChanges {
  @Input() formType: any;
  @Input() editId: any = 0;
  @Input() ProductName: any = '';
  @Output() selectedClient: EventEmitter<any> = new EventEmitter<any>();
  getAccountForm!: FormGroup;
  clientData: any;

  submitAPI: any;
  addAPI: any;
  accType: string = '';
  DisplayData: any;
  showData = false;
  MemberType!: any;
  hideSearchPara = false;

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.apiFormat(this.formType);
    this.getClientData();
    this.getMemeberType();
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
    } else {
      this.submitAPI = ApiRoutes.client;
      this.addAPI = ApiRoutes.clientMaster;
    }
  }

  onAdd(data: any) {
    console.log(data, 'data');

    if (this.editId !== 0) {
    }

    if (Object.keys(data).length > 2) this.selectedClient.emit(data);

    let searchID = data.cif_id ? data.cif_id : data.id;
    let tempObj = { AccId: data.id, AccType: this.accType };
    console.log(this.addAPI);

    this.api.get(this.addAPI, this.accType !== '' ? tempObj : {}, this.accType !== '' ? 0 : searchID).subscribe((res) => {
      this.DisplayData = res.payload.data[0];
      console.log(this.DisplayData);
      if (Object.keys(data).length > 2)
        if (data.cif_id > 0) {
          console.log('uppper');
          this.DisplayData['product_name'] = data.product_name ? data.product_name : null;
          this.DisplayData['cif_acc_no'] = data.CIFNo ? data.CIFNo : data.account_no;
          this.DisplayData['acc_no'] = data.SAccNo ? data.SAccNo : null;
        } else {
          console.log('lower');

          this.DisplayData['product_name'] = this.DisplayData && this.DisplayData.product_name ? this.DisplayData.product_name : null;
          console.log(this.DisplayData.product_name);
          this.DisplayData['cif_acc_no'] =
            this.DisplayData && this.DisplayData.CIFNo ? this.DisplayData.CIFNo : this.DisplayData.account_no;
          this.DisplayData['acc_no'] = this.DisplayData && this.DisplayData.SAccNo ? this.DisplayData.SAccNo : null;
        }

      for (let j = 0; j < this.MemberType.length; j++) {
        if (this.DisplayData.member_type_id === this.MemberType[j].id) {
          this.DisplayData['member_type_name'] = this.MemberType[j].code_value;
        }
      }
      console.log(this.DisplayData);

      this.showData = true;
    });
  }
}
