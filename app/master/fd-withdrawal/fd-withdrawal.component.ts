import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-fd-withdrawal',
  templateUrl: './fd-withdrawal.component.html',
  styleUrls: ['./fd-withdrawal.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class FdWithdrawalComponent {
  selectedId: any = {};
  loadMainForm = false;
  addNewFDReturnForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}
  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'FD WITHDRAWAL' }]);
    this.ds.setPageTitle('FD WITHDRAWAL');
    this.createAddNewFDReturnForm();
  }
  clientSelected(data: any) {
    if (data && data.id) {
      this.selectedId = data.id;
      this.loadMainForm = true;
    } else {
      this.loadMainForm = false;
    }
  }
  createAddNewFDReturnForm() {
    this.addNewFDReturnForm = this._fb.group({
      date1: new FormControl(),
      duration: new FormControl(),
      interest_rate: new FormControl()
    });
    this.loadMainForm = true;
    // if (this.viewMode === true) {this.addNewSavingsAccountForm.disable();};
  }
  onSubmit(form: FormGroup) {
    if (form) {
      // this.api.post(ApiRoutes.loanProductData, form.value).subscribe((res) => {
      //   console.log('response', res);
      // });
    }
  }
}
