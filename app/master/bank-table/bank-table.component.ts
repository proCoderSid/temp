import { Component } from '@angular/core';
import { ConfirmEventType } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { InverseStatusList, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from '../../core/decorators/debounce.decorator';
import { ApiService } from '../../core/services/api.service';
import { DesignService } from '../../core/services/design.service';
import { SharedModule } from '../../shared/shared.module';
import { AppFilterData, AppTable, AppTableHeaderList } from './../../core/models/table.model';
import { BankAddEditComponentComponent } from './bank-add-edit-component/bank-add-edit-component.component';

@Component({
  selector: 'app-bank-table',
  templateUrl: './bank-table.component.html',
  styleUrls: ['./bank-table.component.scss'],
  standalone: true,
  imports: [SharedModule, BankAddEditComponentComponent]
})
export class BankTableComponent {
  bankList: any = [];

  statusList = StatusList;

  inverseStatusList = InverseStatusList;

  ref: DynamicDialogRef | undefined;
  pager = new AppTable();

  headerList: AppTableHeaderList = [
    {
      field: 'action',
      title: 'Action',
      minWidth: '5%',
      type: 'CUSTOM'
    },
    {
      field: 'bank_name',
      title: 'Bank Name',
      minWidth: '55%',
      type: 'DEFAULT'
    },
    {
      field: 'is_deactivated',
      title: 'Active',
      minWidth: '20%',
      type: 'BADGE',
      typeConfig: {
        badge: this.inverseStatusList
      }
    },

    {
      field: 'is_locked',
      title: 'Locked',
      minWidth: '20%',
      type: 'BADGE',
      typeConfig: {
        badge: this.statusList
      }
    }
  ];

  initialFilter: AppFilterData = {
    // bank_name: {
    //   value: '',
    //   matchMode: 'contain'
    // }
  };

  permanentFilter: AppFilterData = {
    // bank_name: {
    //   value: '',
    //   matchMode: 'contain'
    // }
  };

  flags: any = {
    isAddOrEditDialog: false
  };

  sb: {
    tableData?: Subscription;
    confirmation?: Subscription;
  } = {};

  constructor(
    private api: ApiService,
    private ds: DesignService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'BANK' }]);
    this.ds.setPageTitle('BANK ');

    this.pager.setHeaderList(this.headerList);
    this.pager.setFilter(this.initialFilter, this.permanentFilter);
  }

  @Debounce(300)
  onLazyLoad(event: TableLazyLoadEvent) {
    this.pager.loading = false;
    this.getTableData();
  }

  getTableData() {
    this.pager.loading = true;
    this.bankList.length = 0;

    const params = this.pager.getTableParams();

    this.sb.tableData?.unsubscribe();

    this.sb.tableData = this.api.get(ApiRoutes.bankMaster, params).subscribe((res) => {
      this.bankList = res.payload.data;
      this.pager.totalRecords = +(res.pager.totalRecords || 0);
      this.pager.recordsPerPage = +(res.pager.recordsPerPage || 0);
      this.pager.pageNumber = +(res.pager.pageNumber || 0);

      setTimeout(() => {
        this.pager.loading = false;
      }, 0);
    });
  }

  onSortIcon(event: any) {}

  headerTrackBy(index: number, header: { field: string }) {
    return header.field;
  }

  exportExcel() {}

  exportPdf() {}

  onAddRecord() {
    this.ref = this.ds.dialog.open(BankAddEditComponentComponent, {
      header: 'Add New Bank',
      width: '500px',
      appendTo: 'body',
      maximizable: true
    });

    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.getTableData();
      }
    });
  }

  onUpdateRecord(data: any) {
    if (data.is_locked != 1) {
      this.ref = this.ds.dialog.open(BankAddEditComponentComponent, {
        header: 'Update Bank',
        width: '500px',
        appendTo: 'body',
        maximizable: true,
        data: data
      });
      this.ref.onClose.subscribe((data) => {
        if (data) {
          this.getTableData();
        }
      });
    }
  }

  onDeleteRecord(data: any) {
    console.log('test');

    this.ds.confirm.confirm({
      key: 'dialog',
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO: Call api to delete the record
        this.api.delete(ApiRoutes.bankMaster, data['id']).subscribe((res) => {
          console.log(res);
        });
        // On success call following toast
        this.ds.message.add({ severity: 'success', summary: 'Confirmed', detail: 'You have deleted Successfully' });
      },
      reject: (type: ConfirmEventType) => {
        // TODO: Revert if any switch or button changes or leave bank if nothing
        switch (type) {
          case ConfirmEventType.REJECT:
            this.ds.message.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.ds.message.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      }
    });
  }

  onRowSelect(event: any, data?: any) {
    console.log(event.key, event.keyCode, data);

    switch (event?.keyCode) {
      //For Edit ( Enter key code is 13)
      case 13:
        this.onUpdateRecord(data);
        break;

      // For delete ( Delete key code is 46)
      case 46:
        this.onDeleteRecord(data);
        break;

      default:
        break;
    }
  }

  ngOnDestroy() {
    Object.values(this.sb).forEach((element) => {
      element?.unsubscribe();
    });
  }
}
