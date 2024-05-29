import { Component } from '@angular/core';
import { ConfirmEventType } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ApiRoutes } from 'src/app/core/constants/api-routes.const';
import { BASE, InverseStatusList, StatusList } from 'src/app/core/constants/base.const';
import { Debounce } from 'src/app/core/decorators/debounce.decorator';
import { ApiService } from 'src/app/core/services/api.service';
import { DesignService } from 'src/app/core/services/design.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppFilterData, AppTable, AppTableHeaderList } from './../../core/models/table.model';
import { AddCityComponent } from './add-city/add-city.component';

@Component({
  selector: 'app-city-table',
  templateUrl: './city-table.component.html',
  styleUrls: ['./city-table.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class CityTableComponent {
  ref: DynamicDialogRef | undefined;
  pager = new AppTable();

  tableList: any = [];
  countryData: any;
  stateData: any;
  districtData: any;
  talukaData: any;
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
      field: 'city_name',
      title: 'City Name',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'talukaName',
      title: 'Taluka',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'districtName',
      title: 'District',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'stateName',
      title: 'State',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain',
        showMenu: true
      }
    },
    {
      field: 'countryName',
      title: 'Country',
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
    this.ds.setBreadcrumbs([{ label: 'MASTER' }, { label: 'CITY ' }]);
    this.ds.setPageTitle('CITY');

    this.pager.setHeaderList(this.headerList);
    this.pager.setFilter(this.initialFilter, this.permanentFilter);
  }

  @Debounce(300)
  onLazyLoad(event: TableLazyLoadEvent) {
    this.pager.loading = false;
    this.getTableData();
  }
  getTalukaData() {
    this.api.get(ApiRoutes.talukaMaster, { page: 1, size: BASE.DEFAULT_SIZE_500 }).subscribe((response) => {
      this.talukaData = response.payload.data;
      this.tableList.forEach((i: any, index: any) => {
        let temp = this.talukaData.filter((j: any) => j.id === i['taluka_id']);
        this.tableList[index]['talukaName'] = temp[0].taluka_name;
      });
    });
  }

  getDistrictData() {
    this.api.get(ApiRoutes.districtMaster, { page: 1, size: BASE.DEFAULT_SIZE_500 }).subscribe((response) => {
      this.districtData = response.payload.data;
      this.tableList.forEach((i: any, index: any) => {
        let temp = this.districtData.filter((j: any) => j.id === i['district_id']);
        this.tableList[index]['districtName'] = temp[0].district_name;
      });
    });
  }

  getStateData() {
    this.api.get(ApiRoutes.stateMater, { page: 1, size: BASE.DEFAULT_SIZE_500 }).subscribe((response) => {
      this.stateData = response.payload.data;
      this.tableList.forEach((i: any, index: any) => {
        let temp = this.stateData.filter((j: any) => j.id === i['state_id']);
        this.tableList[index]['stateName'] = temp[0].state_name;
      });
    });
  }

  getCountryData() {
    this.api.get(ApiRoutes.countryMaster, { page: 1, size: BASE.DEFAULT_SIZE_500 }).subscribe((response) => {
      this.countryData = response.payload.data;
      this.tableList.forEach((i: any, index: any) => {
        let temp = this.countryData.filter((j: any) => j.id === i['country_id']);
        this.tableList[index]['countryName'] = temp[0].country_name;
      });
    });
  }

  getTableData() {
    this.pager.loading = true;
    this.tableList.length = 0;
    const params = this.pager.getTableParams();
    this.sb.tableData?.unsubscribe();
    this.sb.tableData = this.api.get(ApiRoutes.cityMaster, params).subscribe((res) => {
      this.tableList = res.payload.data;
      this.getTalukaData();
      this.getDistrictData();
      this.getStateData();
      this.getCountryData();
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
    this.ref = this.ds.dialog.open(AddCityComponent, {
      header: 'Add New City',
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
      this.ref = this.ds.dialog.open(AddCityComponent, {
        header: 'Update City',
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
    this.ds.confirm.confirm({
      key: 'dialog',
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO: Call api to delete the record
        this.api.delete(ApiRoutes.cityMaster, data['id']).subscribe((res) => {
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
