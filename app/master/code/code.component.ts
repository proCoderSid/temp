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
import { AddOrEditCodeComponent } from './add-or-edit-code/add-or-edit-code.component';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  standalone: true,
  imports: [SharedModule, AddOrEditCodeComponent]
})
export class CodeComponent {
  ref: DynamicDialogRef | undefined;
  pager = new AppTable();

  tableList: any = [];
  statusList = StatusList;
  inverseStatusList = InverseStatusList;
  headerList: AppTableHeaderList = [
    {
      field: 'action',
      title: 'Action',
      minWidth: '5%',
      type: 'CUSTOM'
    },
    {
      field: 'code_name',
      title: 'Code Name',
      minWidth: '250px',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'is_deactivated',
      title: 'Active',
      minWidth: '150px',
      type: 'BADGE',
      typeConfig: {
        badge: this.inverseStatusList
      },
      columnFilter: {
        show: true,
        type: 'inverse_status_dropdown',
        matchMode: 'contain',
        showMenu: false
      }
    },
    {
      field: 'is_mandatory',
      title: 'Mandatory',
      minWidth: '150px',
      type: 'BADGE',
      typeConfig: {
        badge: this.statusList
      },
      columnFilter: {
        show: true,
        type: 'status_dropdown',
        matchMode: 'contain',
        showMenu: false
      }
    },
    {
      field: 'is_locked',
      title: 'Locked',
      minWidth: '150px',
      type: 'BADGE',
      typeConfig: {
        badge: this.statusList
      },
      columnFilter: {
        show: true,
        type: 'status_dropdown',
        matchMode: 'contain',
        showMenu: false
      }
    },
    {
      field: 'is_system',
      title: 'System Defined',
      minWidth: '150px',
      type: 'BADGE',
      typeConfig: {
        badge: this.statusList
      },
      columnFilter: {
        show: true,
        type: 'status_dropdown',
        matchMode: 'contain',
        showMenu: false
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

  sb: {
    tableData?: Subscription;
  } = {};

  constructor(
    private api: ApiService,
    private ds: DesignService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'CODE' }]);
    this.ds.setPageTitle('CODE');

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
    this.tableList.length = 0;

    const params = this.pager.getTableParams();

    this.sb.tableData?.unsubscribe();

    this.sb.tableData = this.api.get(ApiRoutes.codeMaster, params).subscribe((res) => {
      this.tableList = res.payload.data;
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
    this.ref = this.ds.dialog.open(AddOrEditCodeComponent, {
      header: 'Add New Code',
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
      this.ref = this.ds.dialog.open(AddOrEditCodeComponent, {
        header: 'Update New Code',
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
        this.api.delete(ApiRoutes.codeMaster, data['id']).subscribe((res) => {
          console.log(res);
        });
        this.ds.message.add({ severity: 'success', summary: 'Confirmed', detail: 'You have deleted Successfully' });
      },
      reject: (type: ConfirmEventType) => {
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
      case 13:
        this.onUpdateRecord(data);
        break;
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
