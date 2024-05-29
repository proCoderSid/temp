import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'code-table',
        loadComponent: () => import('./code/code.component').then((c) => c.CodeComponent)
      },
      {
        path: 'code-value-table',
        loadComponent: () => import('./code-value/code-value.component').then((c) => c.CodeValueComponent)
      },
      {
        path: 'bank-table',
        loadComponent: () => import('./bank-table/bank-table.component').then((c) => c.BankTableComponent)
      },
      {
        path: 'bank-branch-table',
        loadComponent: () => import('./bank-branch/bank-branch.component').then((c) => c.BankBranchComponent)
      },
      {
        path: 'taluka-table',
        loadComponent: () => import('./taluka-table/taluka-table.component').then((c) => c.TalukaTableComponent)
      },
      {
        path: 'city-table',
        loadComponent: () => import('./city-table/city-table.component').then((c) => c.CityTableComponent)
      },
      {
        path: 'district-table',
        loadComponent: () => import('./district-table/district-table.component').then((c) => c.DistrictTableComponent)
      },
      {
        path: 'account-number',
        loadComponent: () => import('./account-number/account-number.component').then((c) => c.AccountNumberComponent)
      },
      {
        path: 'number-preference',
        loadComponent: () => import('./number-preference/number-preference.component').then((c) => c.NumberPreferenceComponent)
      },
      {
        path: 'branch',
        loadChildren: () => import('./branch-list/branch-list.module').then((m) => m.BranchListModule)
      },

      {
        path: 'charge',
        loadComponent: () => import('./charge-list/charge-list.component').then((c) => c.ChargeListComponent)
      },
      {
        path: 'fd-account',
        loadChildren: () => import('./fd-account/fd-account.module').then((m) => m.FdAccountModule)
      },
      {
        path: 'rd-account',
        loadChildren: () => import('./rd-account/rd-account.module').then((m) => m.RdAccountModule)
      },
      {
        path: 'loan-account',
        loadChildren: () => import('./loan-account/loan-account.module').then((m) => m.LoanAccountModule)
      },
      {
        path: 'savings-account',
        loadChildren: () => import('./savings-account/savings-account.module').then((m) => m.SavingsAccountModule)
      },
      {
        path: 'fd-product',
        loadChildren: () => import('./fd-product/fd-product.module').then((m) => m.FdProductModule)
      },
      {
        path: 'rd-product',
        loadChildren: () => import('./rd-product/rd-product.module').then((m) => m.RdProductModule)
      },
      {
        path: 'loan-product',
        loadChildren: () => import('./loan-product/loan-product.module').then((m) => m.LoanProductModule)
      },
      {
        path: 'savings-product',
        loadChildren: () => import('./savings-product/savings-product.module').then((m) => m.SavingsProductModule)
      },
      {
        path: 'client',
        loadComponent: () => import('./client/client.component').then((c) => c.ClientComponent)
      },
      {
        path: 'fd-withdrawal',
        loadComponent: () => import('./fd-withdrawal/fd-withdrawal.component').then((c) => c.FdWithdrawalComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {}
