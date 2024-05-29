import { FilterMetadata } from 'primeng/api';
import { TablePageEvent } from 'primeng/table';
import { DataFormatEnum } from '../shared/components/data-format/data-format.enum';
import { IDataFormatConfig } from '../shared/components/data-format/data-format.interface';

export class AppTable {
  private search: string = '';
  pageNumber: number = 1;
  recordsPerPage: number = 25;
  totalRecords: number = 0;
  sortBy: string = '';
  sortOrder: string = '';
  rowsPerPageOptions: Array<number> = [5, 10, 25, 50];
  loading: boolean = true;
  smallTable?: boolean | null = undefined;
  showFilterRow?: boolean = true;
  headerList: AppTableHeaderList = [];
  selectedColumns: AppTableHeaderList = [];
  filters: AppFilterData = {};
  private permanentFilter: AppFilterData = {};

  getTableParams = () => {
    // Set Permanent Filter
    Object.entries(this.permanentFilter).forEach(([key, value]) => {
      this.filters[key] = JSON.parse(JSON.stringify(value));
    });

    this.search = JSON.stringify(this.filters);

    return {
      pageNumber: this.pageNumber,
      recordsPerPage: this.recordsPerPage,
      ...(this.sortBy && { sortBy: this.sortBy }),
      ...(this.sortOrder && { sortOrder: this.sortOrder }),
      ...(this.search && { search: this.search })
    };
  };

  setHeaderList(value: AppTableHeaderList) {
    this.headerList = value;
    this.selectedColumns = value;
  }

  setFilter(initial: AppFilterData, permanent: AppFilterData) {
    this.filters = initial;
    this.permanentFilter = permanent;
  }

  onRecordsPerPageChange(recordsPerPage: number) {
    this.recordsPerPage = recordsPerPage;
  }

  onSort(event: TableSortEvent) {
    this.sortBy = event.field;
    this.sortOrder = event.order === 1 ? 'asc' : 'desc';
  }

  onPageChange(event: TablePageEvent | undefined = undefined) {
    if (!!event?.first && !!event?.rows) {
      this.pageNumber = event?.first / event?.rows + 1;
    } else {
      this.pageNumber = 1;
    }
  }

  hideColumn(header: any): boolean {
    if (typeof header?.hideFun === 'function') {
      return !header?.hideFun();
    }
    if (header?.hide === true) {
      return false;
    }
    return true;
  }
}

export interface AppTableHeaderList extends Array<AppTableHeader> {}

export interface AppTableHeader {
  field: string;
  title: string;
  classList?: string;
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  columnFilter?: {
    show: boolean;
    type: string;
    classList?: string;
    matchMode?: string;
    matchModeOptions?: Array<{ label: string; value: string }>;
    dataType?: 'string' | 'date' | 'number' | 'object' | 'array';
    decimal?: number;
    default?: string | number;
    format?: string;
    showMenu?: boolean;
  };
  type?: keyof typeof DataFormatEnum;
  typeConfig?: IDataFormatConfig;
  hide?: boolean;
  hideFun?: Function;
  align?: 'RIGHT' | 'CENTER' | 'LEFT';
  format?: string;
}

export interface AppFilterData {
  [key: string]: FilterMetadata;
}

export interface TableSortEvent {
  field: string;
  order: number;
}
