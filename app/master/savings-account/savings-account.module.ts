import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddSavingsAccountComponent } from './add-savings-account/add-savings-account.component';
import { SavingsAccountComponent } from './savings-account.component';

const routes: Routes = [
  {
    path: '',

    component: SavingsAccountComponent
  },
  {
    path: 'add-savings-account',
    component: AddSavingsAccountComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class SavingsAccountModule {}
