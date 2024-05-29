import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  Frequency,
  StatusList,
  amortizationMethod,
  compoundType,
  interestCalculationUsing,
  rescheduleStrategy
} from 'src/app/core/constants/base.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientComponent } from '../../client/client.component';

@Component({
  selector: 'app-add-loan-account',
  templateUrl: './add-loan-account.component.html',
  styleUrls: ['./add-loan-account.component.scss'],
  standalone: true,
  imports: [SharedModule, ClientComponent]
})
export class AddLoanAccountComponent {
  addNewLoanAccountForm!: FormGroup;
  yesNoList = StatusList;
  selectedId!: number;
  interestCalculationUsing = interestCalculationUsing;
  Frequency = Frequency;
  amortizationMethod = amortizationMethod;
  compoundType = compoundType;
  rescheduleStrategy = rescheduleStrategy;

  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'LOAN-ACCOUNT-MASTER' }]);
    this.ds.setPageTitle('LOAN-ACCOUNT-MASTER');
    this.createAddFdProductInformationForm();
  }

  createAddFdProductInformationForm() {
    this.addNewLoanAccountForm = this._fb.group({
      //details
      account_no: new FormControl(),
      product_id: new FormControl(),
      branch_id: new FormControl(),
      home_branch_id: new FormControl(),
      loan_purpose_id: new FormControl(),
      loan_officer_id: new FormControl(),
      submition_date: new FormControl(),
      description: new FormControl(null),
      is_deactivated: new FormControl(1),

      //Loan & Installment Settings
      principal_amount: new FormControl(),
      principal_amount_proposed: new FormControl(),
      loan_disburse_date: new FormControl(),
      total_installment: new FormControl(),
      installment_from: new FormControl(),
      due_date: new FormControl(),
      interest_rate: new FormControl(),
      interest_product_cal_method: new FormControl(),
      repay_period: new FormControl(),
      repay_every: new FormControl(),
      repay_week: new FormControl(),
      repay_day: new FormControl(),
      amortization_method: new FormControl(),
      fix_installment_amount: new FormControl(),
      fix_interest_amount: new FormControl(),
      interest_method: new FormControl(),
      moratorium_principal_period: new FormControl(),
      moratorium_interest_period: new FormControl(),

      //Mortgage & Security
      mortgage_amount: new FormControl(),
      chq_nos: new FormControl(),
      chq_bank: new FormControl(),
      chq_detail: new FormControl(),

      //Over Due Interest Settings
      overdue_interest_rate: new FormControl(),
      overdue_interest_flat: new FormControl(),
      overdue_interest_when: new FormControl(),
      overdue_interest_on_amount: new FormControl(),
      overdue_interest_start_from_days: new FormControl(),
      overdue_interest_start_from_months: new FormControl(),
      overdue_interest_frequency: new FormControl(),
      overdue_interest_interval: new FormControl(),

      // Settings
      interest_calculated_period: new FormControl(),
      interest_calculate_after: new FormControl(),
      interest_capitalize: new FormControl(),
      overdue_interest_capitalize: new FormControl(),
      charge_capitalize: new FormControl(),
      allow_multiple_disbursals: new FormControl(),
      allow_reschedule: new FormControl(),
      compound_type: new FormControl(),
      reschedule_strategy: new FormControl()
    });
  }
  clientSelected(data: any) {}

  onSubmit() {
    if (this.addNewLoanAccountForm.valid) {
      console.log(this.addNewLoanAccountForm.value);
      return;
    }
  }
}
