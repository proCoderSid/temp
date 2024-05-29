import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CodeComponent } from './code/code.component';
import { MasterRoutingModule } from './master-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, MasterRoutingModule, CodeComponent]
})
export class MasterModule {}
