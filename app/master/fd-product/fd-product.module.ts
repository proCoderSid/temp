import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddFdProductComponent } from './add-fd-product/add-fd-product.component';
import { FdProductComponent } from './fd-product.component';

const routes: Routes = [
  {
    path: '',

    component: FdProductComponent
  },
  {
    path: 'add-fd-product',
    component: AddFdProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class FdProductModule {}
