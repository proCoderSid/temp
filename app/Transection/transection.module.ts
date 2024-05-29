import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TransectionRoutingModule } from './transection-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, TransectionRoutingModule, SharedModule]
})
export class TransectionModule {}
