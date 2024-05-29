import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddrdAccountComponent } from './add-ar-account/add-rd-account.component';
import { RdAccountComponent } from './rd-account.component';

const routes: Routes = [
  {
    path: '',

    component: RdAccountComponent
  },
  {
    path: 'add-rd-account',
    component: AddrdAccountComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class RdAccountModule {}
