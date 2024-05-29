import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddFdAccountComponent } from './add-fd-account/add-fd-account.component';
import { FdAccountComponent } from './fd-account.component';

const routes: Routes = [
  {
    path: '',
    component: FdAccountComponent
  },
  {
    path: 'add-fd-account',
    component: AddFdAccountComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class FdAccountModule {}
