import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddLoanProductComponent } from './add-loan-product/add-loan-product.component';
import { LoanProductComponent } from './loan-product.component';

const routes: Routes = [
  {
    path: '',
    component: LoanProductComponent
  },
  {
    path: 'add-Loan-product',
    component: AddLoanProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class LoanProductModule {}
