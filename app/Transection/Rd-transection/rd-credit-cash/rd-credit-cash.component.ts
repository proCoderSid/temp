import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { ClientComponent } from 'src/app/master/client/client.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-rd-credit-cash',
  templateUrl: './rd-credit-cash.component.html',
  styleUrls: ['./rd-credit-cash.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class RdCreditCashComponent {
  selectedId: any = {};
  loadMainForm = false;
  addNewCreditCashForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}
  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'RD-CREDIT-CASH' }]);
    this.ds.setPageTitle('RD-CREDIT-CASH');
    this.createAddNewCreditCashForm();
  }
  clientSelected(data: any) {
    if (data && data.id) {
      this.selectedId = data.id;
      this.loadMainForm = true;
    } else {
      this.loadMainForm = false;
    }
  }
  createAddNewCreditCashForm() {
    this.addNewCreditCashForm = this._fb.group({
      date1: new FormControl(null),
      cr_amount: new FormControl(null),
      instrument_id: new FormControl(null),
      rd_account_id: new FormControl(null),
      cheque_number: new FormControl(null),
      cheque_date: new FormControl(null),
      receipt_number: new FormControl(null),
      remarks: new FormControl(null)
    });
  }
  onSubmit(form: FormGroup) {
    console.log(form.value);

    if (form.valid) {
      //   this.api.post(ApiRoutes.loanProductData, form.value).subscribe((res) => {
      //     console.log('response', res);
      // });
    }
  }
}
