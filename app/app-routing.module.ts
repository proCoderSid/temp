import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/uikit/button' },
  {
    path: 'master',
    loadChildren: () => import('./master/master.module').then((m) => m.MasterModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./Transection/transection.module').then((m) => m.TransectionModule)
  },
  {
    path: 'customer-information',
    loadChildren: () => import('./customer-information/customer-information.module').then((m) => m.CustomerInformationModule)
  },
  {
    path: 'demo-table',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./demo-table/demo-table.component').then((m) => m.DemoTableComponent)
      }
    ]
  },
  {
    path: 'uikit',
    component: LayoutComponent,
    children: [
      {
        path: '',
        data: { breadcrumb: 'UI Kit' },
        loadChildren: () => import('./demo/components/uikit/uikit.module').then((m) => m.UIkitModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
