export class BASE {
  public static PAGINATION_ARRAY: number[] = [10, 25, 50, 100, 200, 500];
  public static CONSTANT_PAGINATION_ARRAY: number[] = [10, 25, 50, 100, 200, 500];
  public static CUSTOM_PAGINATION_ARRAY: number[] = [500, 1000, 1500, 2000];
  public static ENCRYPTION_TOKEN = 'QBI2llvXLuKL3X4t7aa4pfZSdYNxnVRAURxuNznVxjmvrrGpAwUiSaMZ2UFXkYYb4KT5Vu9vwiGYN3afj8mJ0I3zicZiOqUAeVdN';
  public static INVOICE_STATE = 'Gujarat';
  public static INVOICE_STATE_CODE = '24';
  public static TOAST_TIMEOUT = 4000;
  public static PERCENTAGE = 100;
  public static DEFAULT_SIZE_500 = 500;
  public static DEFAULT_SIZE_2000 = 2000;
  public static HEADER_ARRAY = [{ clID: 0 }, { userID: 0 }, { brID: 0 }, { year: 0 }];
  public static LENGTH_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
}
export const savingsProductType = [
  {
    label: 'Savings',
    value: 0
  },
  {
    label: 'Compulsory Savings',
    value: 1
  }
];
export const searchBy = [
  {
    label: 'Account Number',
    value: 'account_no'
  },
  {
    label: 'CIF Number',
    value: 'cif_no'
  },
  {
    label: 'Account name',
    value: 'account_name'
  }
];
export const mainSearchBy = [
  {
    label: 'CIF Number',
    value: 'account_no'
  },
  {
    label: 'Account name',
    value: 'account_name'
  }
];
export const interestCalculationUsing = [
  {
    label: 'Daily Balance',
    value: 1
  },
  {
    label: 'Average Daily Balance',
    value: 2
  },
  {
    label: 'Minimum Balance',
    value: 3
  }
];
export const amortizationMethod = [
  {
    label: 'Equal Principal Payments',
    value: 0
  },
  {
    label: 'EMI',
    value: 1
  },
  {
    label: 'Fix',
    value: 2
  }
];
export const compoundType = [
  {
    label: 'None',
    value: 0
  },
  {
    label: 'Fee',
    value: 1
  },
  {
    label: 'Interest',
    value: 2
  },
  {
    label: 'Fee + Interest',
    value: 3
  }
];
export const rescheduleStrategy = [
  {
    label: 'Reduce EMI Amount',
    value: 0
  },
  {
    label: 'Reduce Number of Installments',
    value: 1
  },
  {
    label: 'Reschedule Next Repayments',
    value: 2
  }
];
export const Frequency = [
  {
    label: 'Days',
    value: 1
  },
  {
    label: 'Weeks',
    value: 2
  },
  {
    label: 'Months',
    value: 3
  },
  {
    label: 'Years',
    value: 4
  }
];

export const StatusList = [
  {
    value: 1,
    type: 'success',
    text: 'Yes'
  },
  {
    value: 0,
    type: 'danger',
    text: 'No'
  }
];
export const InverseStatusList = [
  {
    value: 0,
    type: 'success',
    text: 'Yes'
  },
  {
    value: 1,
    type: 'danger',
    text: 'No'
  }
];
export const StatusYNList = [
  {
    label: 'Yes',
    value: 'Y',
    otherValue: 1,
    otherLabel: 'Active'
  },
  {
    label: 'No',
    value: 'N',
    otherValue: 0,
    otherLabel: 'InActive'
  }
];
export const SavingsProductTypeList = [
  {
    label: 'Savings',
    value: 0
  },
  {
    label: 'Compulsory Savings',
    value: 1
  }
];
export const LoanProductTypeList = [
  {
    label: 'MidTerm',
    value: 1
  },
  {
    label: 'Gold',
    value: 2
  }
];
export const CsSavingWithdrawalList = [
  {
    label: 'Account Close',
    value: 0
  },
  {
    label: 'Any Time',
    value: 1
  }
];
export const FrequencyList = [
  {
    label: 'Days',
    value: 1
  },
  {
    label: 'Weeks',
    value: 2
  },
  {
    label: 'Months',
    value: 3
  },
  {
    label: 'Years',
    value: 4
  }
];
export const InterestCalculationPeriodList = [
  {
    label: 'Daily',
    value: 1
  },
  {
    label: 'Monthly',
    value: 2
  },
  {
    label: 'Quarterly',
    value: 3
  },
  {
    label: 'Half Yearly',
    value: 4
  },
  {
    label: 'Yearly',
    value: 5
  },
  {
    label: 'On Maturity',
    value: 6
  }
];
export const PhysicalYearPrefix = [
  {
    value: 1,
    type: 'success',
    text: 'financial year'
  },
  {
    value: 0,
    type: 'danger',
    text: 'None'
  }
];
export const AddAccountPrefixTypeList = [
  {
    value: 1,
    type: 'success',
    text: 'Product Short Code'
  },
  {
    value: 0,
    type: 'danger',
    text: 'None'
  }
];
export const AmortizationMethodList = [
  {
    label: 'Equal Principal Payments',
    value: 0
  },
  {
    label: 'EMI',
    value: 1
  },
  {
    label: 'Fix',
    value: 2
  }
];
export const RepaymentStrategyList = [
  {
    label: 'Penalties,Fees,Interest,Principal',
    value: 1
  }
];
export const InterestMethodList = [
  {
    label: 'Declining balance',
    value: 0
  },
  {
    label: 'Flat',
    value: 1
  }
];
export const LoanMonthCalculated = [
  {
    label: '0',
    value: 0
  },
  {
    label: '0.5',
    value: 0.5
  },
  {
    label: '1',
    value: 1
  }
];
export const AccountTypeForAddAccount = [
  {
    value: 1,
    type: 'success',
    text: 'User Defined'
  },
  {
    value: 0,
    type: 'danger',
    text: 'auto'
  }
];
export const LengthList = [
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
  { text: '6', value: '6' },
  { text: '7', value: '7' },
  { text: '8', value: '8' },
  { text: '9', value: '9' },
  { text: '10', value: '10' },
  { text: '11', value: '11' },
  { text: '12', value: '12' }
];
export const DaysInMonthYearList = [
  {
    label: 'Actual',
    otherLabel: 'Actual',
    value: 0
  },
  {
    label: '30 Days',
    otherLabel: '365 Days',
    value: 1
  }
];
export const chargePaymentBy = [
  {
    label: 'Regular',
    value: 1
  },
  {
    label: 'Account Transfer',
    value: 0
  }
];
export const glAccountType = [
  {
    label: 'Share',
    value: 1
  },
  {
    label: 'Savings',
    value: 2
  },
  {
    label: 'GL',
    value: 0
  }
];

export const CompoundTypeList = [
  {
    label: 'None',
    value: 0
  },
  {
    label: 'Fee',
    value: 1
  },
  {
    label: 'Interest',
    value: 2
  },
  {
    label: 'Fee + Interest',
    value: 3
  }
];
export const RepayEveryList = [
  {
    label: 'Months',
    value: 0
  },
  {
    label: 'Days',
    value: 1
  },
  {
    label: 'Weeks',
    value: 2
  }
];
export const OverDueInterestList = [
  {
    label: '1 Installment Not Received',
    otherLabel: 'Total OverDue',
    value: 0
  },
  {
    label: '3 Installment Not Received',
    otherLabel: 'Total Outstanding',
    value: 1
  },
  {
    label: 'After Due Date',
    otherLabel: 'Inst. Amount',
    value: 2
  }
];
export const RescheduleStrategyList = [
  {
    label: 'Reduce EMI Amount',
    value: 0
  },
  {
    label: 'Reduce Number of Installments',
    value: 1
  },
  {
    label: 'Reschedule Next Repayments',
    value: 2
  }
];
export const PreMaturePenalInterestList = [
  {
    label: 'Whole Term',
    value: 1
  },
  {
    label: 'Till Premature withdrawal',
    value: 2
  }
];
export const AccountingTypeList = [
  {
    label: 'None',
    value: 0
  },
  {
    label: 'Cash',
    value: 1
  },
  {
    label: 'Transfer',
    value: 2
  }
];
export const fdProductType = [
  {
    label: 'Fix',
    value: 0
  },
  {
    label: 'Double',
    value: 1
  }
];
export const RDInterestCalculationUsing = [
  {
    label: 'Daily Balance',
    value: 1
  },
  {
    label: 'Monthly Balance',
    value: 2
  },
  {
    label: 'Compound Balance',
    value: 3
  },
  {
    label: 'On Last Balance',
    value: 4
  }
];
export const NumberingMethod = [
  {
    label: 'None',
    value: 0
  },
  {
    label: 'Automatic',
    value: 1
  },
  {
    label: 'Manual',
    value: 2
  },
  {
    label: 'Common Numbering',
    value: 3
  }
];
export const FatherOrSpouseList = [
  {
    label: 'Father',
    value: 'Father'
  },
  {
    label: 'Spouse',
    value: 'Spouse'
  }
];
export const BankAccountTypeList = [
  {
    label: 'Savings',
    value: 0
  },
  {
    label: 'Current',
    value: 1
  }
];
