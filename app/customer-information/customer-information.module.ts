import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomerInformationRoutingModule } from './customer-information-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, CustomerInformationRoutingModule]
})
export class CustomerInformationModule {}
