import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'savings-transaction',
        loadChildren: () => import('./saving-transection/saving-transection.module').then((m) => m.SavingTransectionModule)
      },
      {
        path: 'rd-transaction',
        loadChildren: () => import('./Rd-transection/rd-transection.module').then((m) => m.RdTransectionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransectionRoutingModule {}
