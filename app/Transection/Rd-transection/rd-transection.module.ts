import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RdAccountCloseComponent } from './rd-account-close/rd-account-close.component';
import { RdCreditCashComponent } from './rd-credit-cash/rd-credit-cash.component';
import { RdCreditTransferComponent } from './rd-credit-transfer/rd-credit-transfer.component';
import { RdDebitCashComponent } from './rd-debit-cash/rd-debit-cash.component';
import { RdDebitTransferComponent } from './rd-debit-transfer/rd-debit-transfer.component';

const routes: Routes = [
  {
    path: 'rd-credit-transfer',
    component: RdCreditTransferComponent
  },
  {
    path: 'rd-debit-cash',
    component: RdDebitCashComponent
  },
  {
    path: 'rd-credit-cash',
    component: RdCreditCashComponent
  },
  {
    path: 'rd-account-close',
    component: RdAccountCloseComponent
  },
  {
    path: 'rd-debit-transfer',
    component: RdDebitTransferComponent
  }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RdTransectionModule {}
