import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'error-401',
    loadComponent: () => import('./error401/error401.component').then((x) => x.Error401Component)
  },
  {
    path: 'error-403',
    loadComponent: () => import('./error403/error403.component').then((x) => x.Error403Component)
  },
  {
    path: 'error-404',
    loadComponent: () => import('./error404/error404.component').then((x) => x.Error404Component)
  },
  {
    path: 'error-405',
    loadComponent: () => import('./error405/error405.component').then((x) => x.Error405Component)
  },
  {
    path: 'error-408',
    loadComponent: () => import('./error408/error408.component').then((x) => x.Error408Component)
  },
  {
    path: 'error-500',
    loadComponent: () => import('./error500/error500.component').then((x) => x.Error500Component)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
