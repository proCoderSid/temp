import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { ClientTransectionComponent } from 'src/app/master/client-transection/client-transection.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-rd-account-close',
  templateUrl: './rd-account-close.component.html',
  styleUrls: ['./rd-account-close.component.scss'],
  standalone: true,
  imports: [ClientTransectionComponent, SharedModule]
})
export class RdAccountCloseComponent {
  selectedId: any = {};
  debitAccountDetails: any;
  debitAccountDataForDisplay: any;
  debitAccountData: any;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}
  clientSelected(data: any) {
    if (data && data.id) {
      this.selectedId = data.id;
      this.debitAccountDetails = data;
      this.api.get(ApiRoutes.savingAccountDataMaster, '', data.id).subscribe((response) => {
        this.debitAccountDataForDisplay = response.payload.data;
        this.debitAccountData = response.payload.data[0];
      });
    } else {
    }
  }
}
