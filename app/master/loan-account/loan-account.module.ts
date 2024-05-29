import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddLoanAccountComponent } from './add-loan-account/add-loan-account.component';
import { LoanAccountComponent } from './loan-account.component';

const routes: Routes = [
  {
    path: '',
    component: LoanAccountComponent
  },
  {
    path: 'add-loan-account',
    component: AddLoanAccountComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class LoanAccountModule {}
