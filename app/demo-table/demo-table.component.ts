import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Debounce } from '../core/decorators/debounce.decorator';
import { ApiService } from '../core/services/api.service';
import { DesignService } from '../core/services/design.service';
import { SharedModule } from '../shared/shared.module';
import { DemoAddEditComponentComponent } from './demo-add-edit-component/demo-add-edit-component.component';
import { AppFilterData, AppTable, AppTableHeaderList } from './table.model';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss'],
  standalone: true,
  imports: [SharedModule, DemoAddEditComponentComponent]
})
export class DemoTableComponent {
  demoList: any = [
    {
      id: 1,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 0,
      _link: 'https://www.google.com/',
      _multi_link: 'https://www.google.com/, https://www.google.com/'
    },
    {
      id: 2,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 1
    },
    {
      id: 3,
      _string: 'test bank',
      _number: 0,
      _date: new Date(),
      _badge: 0,
      _json: {
        test: 'test'
      }
    },
    {
      id: 1,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 0,
      _link: 'https://www.google.com/',
      _multi_link: 'https://www.google.com/, https://www.google.com/'
    },
    {
      id: 2,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 1
    },
    {
      id: 3,
      _string: 'test bank',
      _number: 0,
      _date: new Date(),
      _badge: 0,
      _json: {
        test: 'test'
      }
    },
    {
      id: 1,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 0,
      _link: 'https://www.google.com/',
      _multi_link: 'https://www.google.com/, https://www.google.com/'
    },
    {
      id: 2,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 1
    },
    {
      id: 3,
      _string: 'test bank',
      _number: 0,
      _date: new Date(),
      _badge: 0,
      _json: {
        test: 'test'
      }
    },
    {
      id: 1,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 0,
      _link: 'https://www.google.com/',
      _multi_link: 'https://www.google.com/, https://www.google.com/'
    },
    {
      id: 2,
      _string: 'test bank',
      _number: 10,
      _date: new Date(),
      _badge: 1
    },
    {
      id: 3,
      _string: 'test bank',
      _number: 0,
      _date: new Date(),
      _badge: 0,
      _json: {
        test: 'test'
      }
    }
  ];

  ref: DynamicDialogRef | undefined;
  pager = new AppTable();

  headerList: AppTableHeaderList = [
    {
      field: 'id',
      title: 'Index',
      classList: 'text-nowrap',
      sortable: true,
      minWidth: '80px',
      align: 'CENTER',
      type: 'INDEX'
    },
    {
      field: '_string',
      title: 'String',
      minWidth: '80px',
      type: 'DEFAULT',
      columnFilter: {
        show: true,
        type: 'text',
        matchMode: 'contain'
      }
    },
    {
      field: '_number',
      title: 'Number',
      minWidth: '150px',
      type: 'NUMBER',
      typeConfig: {
        default: 0,
        decimal: 3
      },
      align: 'RIGHT',
      columnFilter: {
        show: true,
        type: 'number'
      }
    },
    {
      field: '_date',
      title: 'Date Time',
      minWidth: '150px',
      type: 'DATE_TIME',
      columnFilter: {
        show: true,
        type: 'date',
        matchMode: 'equal'
      }
    },
    {
      field: '_date',
      title: 'Date',
      minWidth: '150px',
      type: 'DATE'
    },
    {
      field: '_date',
      title: 'Time',
      minWidth: '150px',
      type: 'TIME'
    },
    {
      field: '_date',
      title: 'Hour Minute',
      minWidth: '150px',
      type: 'HOUR_MINUTE'
    },
    {
      field: '_badge',
      title: 'Badge',
      minWidth: '150px',
      type: 'BADGE',
      typeConfig: {
        badge: [
          {
            value: 0,
            type: 'danger',
            text: 'Inactive'
          },
          {
            value: 1,
            type: 'success',
            text: 'Active'
          }
        ]
      }
    },
    {
      field: '_link',
      title: 'Link',
      minWidth: '150px',
      type: 'LINK',
      typeConfig: {
        routerLink: (data: string, dataItem: any) => {
          return { link: 'test' + data, text: 'Click Here', target: '_blank', class: '', disabled: false };
        }
      }
    },
    {
      field: '_multi_link',
      title: 'Multi Link',
      minWidth: '150px',
      type: 'MULTI_LINK',
      typeConfig: {
        linkSeparator: ',',
        routerLink: (data: any, dataItem: any) => {
          return { link: data, text: 'Click Here', target: '_blank', class: '', disabled: false };
        }
      }
    },
    {
      field: '_json',
      title: 'JSON',
      minWidth: '150px',
      type: 'JSON'
    },
    {
      field: 'action',
      title: 'Action',
      minWidth: '300px',
      type: 'CUSTOM'
    }
  ];

  initialFilter: AppFilterData = {
    _string: {
      value: 'safe',
      matchMode: 'contain'
    }
  };

  permanentFilter: AppFilterData = {
    bank_name: {
      value: 'test',
      matchMode: 'contain'
    }
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
    private _fb: FormBuilder,
    private ds: DesignService
  ) {}

  ngOnInit() {
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
    const params = this.pager.getTableParams();
    console.log('TCL: DemoTableComponent -> getTableData -> params', JSON.parse(params?.search as string));

    this.sb.tableData?.unsubscribe();
    // this.sb.tableData = this.api.get(API_ROUTES.bankMaster, params).subscribe((res) => {
    //   this.demoList = res.payload.data;
    //   this.pager.totalRecords = +(res.pager.totalRecords || 0);
    //   this.pager.recordsPerPage = +(res.pager.recordsPerPage || 0);
    //   this.pager.pageNumber = +(res.pager.pageNumber || 0);

    //   setTimeout(() => {
    //     this.pager.loading = false;
    //   }, 0);
    // });
  }

  @Debounce(300)
  onSearch() {}

  onSortIcon(event: any) {}

  onAddRecord() {}

  headerTrackBy(index: number, header: { field: string }) {
    return header.field;
  }

  exportExcel() {}
  exportPdf() {}

  ngOnDestroy() {
    Object.values(this.sb).forEach((element) => {
      element?.unsubscribe();
    });
  }
}
