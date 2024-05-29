class IAdvanceTable {
  permissions: IPermissions = new IPermissions();
}

class IPermissions {
  list: boolean = false;
  create: boolean = false;
  read: boolean = false;
  edit: boolean = false;
  delete: boolean = false;
  printExcel: boolean = false;
  printCSV: boolean = false;
  printPDF: boolean = false;
  importable: boolean = false;
}
