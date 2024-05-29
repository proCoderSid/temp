import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddRdProductComponent } from './add-rd-product/add-rd-product.component';
import { RdProductComponent } from './rd-product.component';

const routes: Routes = [
  {
    path: '',
    component: RdProductComponent
  },
  {
    path: 'add-rd-product',
    component: AddRdProductComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class RdProductModule {}
