import { Component } from '@angular/core';
import { ConfirmEventType } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { InverseStatusList, PhysicalYearPrefix, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { AppFilterData, AppTable, AppTableHeaderList } from 'src/app/core/models/table.model';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAccountNumberComponent } from './add-account-number/add-account-number.component';

@Component({
  selector: 'app-account-number',
  templateUrl: './account-number.component.html',
  styleUrls: ['./account-number.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class AccountNumberComponent {
  ref: DynamicDialogRef | undefined;
  pager = new AppTable();

  tableList: any = [];
  proTypeList!: any;
  statusList = StatusList;
  inverseStatusList = InverseStatusList;
  prefixStatusList = PhysicalYearPrefix;
  headerList: AppTableHeaderList = [
    {
      field: 'action',
      title: 'Action',
      minWidth: '5%',
      type: 'CUSTOM'
    },
    {
      field: 'product_name',
      title: 'Product',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'prefix_type',
      title: 'Prefix',
      minWidth: '150px',
      type: 'BADGE',
      typeConfig: {
        badge: this.prefixStatusList
      },
      columnFilter: {
        show: true,
        type: 'inverse_status_dropdown',
        matchMode: 'contain',
        showMenu: false
      }
    },
    {
      field: 'number_start_from',
      title: 'Number Start From',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'total_length',
      title: 'Total Length',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
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
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'ACCOUNT NUMBER' }]);
    this.ds.setPageTitle('ACCOUNT NUMBER');

    this.pager.setHeaderList(this.headerList);
    this.pager.setFilter(this.initialFilter, this.permanentFilter);
    this.getProType();
  }

  @Debounce(300)
  onLazyLoad(event: TableLazyLoadEvent) {
    this.pager.loading = false;
    this.getTableData();
  }
  getProType() {
    this.api.get(ApiRoutes.productTypeMaster, {}).subscribe((response) => {
      this.proTypeList = response.payload.data;
      console.log(this.proTypeList);
    });
  }

  getTableData() {
    this.pager.loading = true;
    this.tableList.length = 0;

    const params = this.pager.getTableParams();

    this.sb.tableData?.unsubscribe();

    this.sb.tableData = this.api.get(ApiRoutes.accountNumberMaster, params).subscribe((res) => {
      let table = res.payload.data;
      console.log(table);
      this.tableList = table.map((tableItem: any) => {
        // Find the matching item in proTypeList
        let matchingProType = this.proTypeList.find((proTypeItem: any) => proTypeItem.id == tableItem.product_type_id.toString());

        // If a match is found, merge the objects
        if (matchingProType) {
          return { ...tableItem, ...matchingProType };
        }

        // If no match is found, return the original table item
        return tableItem;
      });

      console.log(this.tableList);

      // this.tableList = res.payload.data;
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
    this.ref = this.ds.dialog.open(AddAccountNumberComponent, {
      header: 'Add New Account',
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
    this.ref = this.ds.dialog.open(AddAccountNumberComponent, {
      header: 'Update Account',
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

  onDeleteRecord(data: any) {
    console.log('test');

    this.ds.confirm.confirm({
      key: 'dialog',
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO: Call api to delete the record

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
