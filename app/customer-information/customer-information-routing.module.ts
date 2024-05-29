import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./customer-information.component').then((m) => m.CustomerInformationComponent)
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./add-or-edit-customer-information/add-or-edit-customer-information.component').then(
            (m) => m.AddOrEditCustomerInformationComponent
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerInformationRoutingModule {}
