import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { ClientTransectionComponent } from 'src/app/master/client-transection/client-transection.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-saving-credit-transfer',
  templateUrl: './saving-credit-transfer.component.html',
  styleUrls: ['./saving-credit-transfer.component.scss'],
  standalone: true,
  imports: [ClientTransectionComponent, SharedModule]
})
export class SavingCreditTransferComponent {
  selectedId: any = {};
  debitAccountDetails: any;
  debitAccountDataForDisplay: any;
  debitAccountData: any;
  constructor(
    private _fb: FormBuilder,
    private api: ApiService,
    private ds: DesignService
  ) {}
  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'SAVING-CREDIT-TRANSFER' }]);
    this.ds.setPageTitle('SAVING-CREDIT-TRANSFER');
  }
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
