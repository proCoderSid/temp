import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { AddBranchListComponent } from './add-branch-list/add-branch-list.component';
import { BranchListComponent } from './branch-list.component';

const routes: Routes = [
  {
    path: '',

    component: BranchListComponent
  },
  {
    path: 'add-branch',
    component: AddBranchListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class BranchListModule {}
