import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { APP_ROUTES } from 'src/app/core/constants/app-routes.const';
import { InverseStatusList, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { AppFilterData, AppTable, AppTableHeaderList } from 'src/app/core/models/table.model';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddFdProductComponent } from './add-fd-product/add-fd-product.component';

@Component({
  selector: 'app-fd-product',
  templateUrl: './fd-product.component.html',
  styleUrls: ['./fd-product.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class FdProductComponent {
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
      field: 'product_name',
      title: 'Product Name',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'in_native',
      title: 'Native Name',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'short_name',
      title: 'Short Name',
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
    private ds: DesignService,
    private _router: Router,
    private _sharedService: SharedService
  ) {}

  ngOnInit() {
    this.ds.setBreadcrumbs([{ label: 'Master' }, { label: 'FD-PRODUCT' }]);
    this.ds.setPageTitle('FD-PRODUCT');

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

    this.sb.tableData = this.api.get(ApiRoutes.fdProductData, params).subscribe((res) => {
      this.tableList = res.payload.data;
      console.log(this.tableList);

      this.pager.totalRecords = +(res.pager.totalRecords || 0);
      this.pager.recordsPerPage = +(res.pager.recordsPerPage || 0);
      this.pager.pageNumber = +(res.pager.recordsPerPage || 0);

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
    this.ref = this.ds.dialog.open(AddFdProductComponent, {
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
    if (data['is_locked'] != 1 && data['id']) {
      this._sharedService.setFDProductId(data['id']);
      this._router.navigateByUrl(APP_ROUTES.addFdProduct);
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
        this.api.delete(ApiRoutes.fdProductData, data['id']).subscribe((res) => {
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
