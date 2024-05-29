import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddSavingsProductComponent } from './add-savings-product/add-savings-product.component';
import { SavingsProductComponent } from './savings-product.component';

const routes: Routes = [
  {
    path: '',

    component: SavingsProductComponent
  },
  {
    path: 'add-savings-product',
    component: AddSavingsProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class SavingsProductModule {}
