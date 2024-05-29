import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SavingCreditCashComponent } from './saving-credit-cash/saving-credit-cash.component';
import { SavingCreditTransferComponent } from './saving-credit-transfer/saving-credit-transfer.component';
import { SavingDebitCashComponent } from './saving-debit-cash/saving-debit-cash.component';
import { SavingDebitTransferComponent } from './saving-debit-transfer/saving-debit-transfer.component';

const routes: Routes = [
  {
    path: 'saving-credit-transfer',
    component: SavingCreditTransferComponent
  },
  {
    path: 'saving-debit-cash',
    component: SavingDebitCashComponent
  },
  {
    path: 'saving-credit-cash',
    component: SavingCreditCashComponent
  },
  {
    path: 'saving-debit-transfer',
    component: SavingDebitTransferComponent
  }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingTransectionModule {}
