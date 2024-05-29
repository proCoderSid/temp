import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  items: MenuItem[] = [
    {
      label: 'UI Kit',
      icon: 'pi pi-fw pi-star-fill',
      items: [
        {
          label: 'Form Layout',
          icon: 'pi pi-fw pi-id-card',
          routerLink: ['/uikit/formlayout']
        },
        {
          label: 'Input',
          icon: 'pi pi-fw pi-check-square',
          routerLink: ['/uikit/input']
        },
        {
          label: 'Float Label',
          icon: 'pi pi-fw pi-bookmark',
          routerLink: ['/uikit/floatlabel']
        },
        {
          label: 'Invalid State',
          icon: 'pi pi-fw pi-exclamation-circle',
          routerLink: ['/uikit/invalidstate']
        },
        {
          label: 'Button',
          icon: 'pi pi-fw pi-box',
          routerLink: ['/uikit/button']
        },
        {
          label: 'Table',
          icon: 'pi pi-fw pi-table',
          routerLink: ['/uikit/table']
        },
        {
          label: 'List',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/uikit/list']
        },
        {
          label: 'Tree',
          icon: 'pi pi-fw pi-share-alt',
          routerLink: ['/uikit/tree']
        },
        {
          label: 'Panel',
          icon: 'pi pi-fw pi-tablet',
          routerLink: ['/uikit/panel']
        },
        {
          label: 'Overlay',
          icon: 'pi pi-fw pi-clone',
          routerLink: ['/uikit/overlay']
        },
        {
          label: 'Media',
          icon: 'pi pi-fw pi-image',
          routerLink: ['/uikit/media']
        },
        {
          label: 'Menu',
          icon: 'pi pi-fw pi-bars',
          routerLink: ['/uikit/menu'],
          routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' }
        },
        {
          label: 'Message',
          icon: 'pi pi-fw pi-comment',
          routerLink: ['/uikit/message']
        },
        {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          routerLink: ['/uikit/file']
        },
        {
          label: 'Chart',
          icon: 'pi pi-fw pi-chart-bar',
          routerLink: ['/uikit/charts']
        },
        {
          label: 'Misc',
          icon: 'pi pi-fw pi-circle-off',
          routerLink: ['/uikit/misc']
        }
      ]
    },
    {
      label: 'Master',
      items: [
        {
          id: 'code-table',
          label: 'Code',
          routerLink: '/master/code-table'
        },
        {
          id: 'bank-table',
          label: 'Bank',
          routerLink: '/master/bank-table'
        },
        {
          id: 'charge',
          label: 'Charges',
          routerLink: '/master/charge'
        },
        {
          id: 'branch',
          label: 'Branch',
          routerLink: '/master/branch'
        },
        {
          id: 'district-table',
          label: 'District',
          routerLink: '/master/district-table'
        },
        {
          id: 'taluka-table',
          label: 'Taluka',
          routerLink: '/master/taluka-table'
        },
        {
          id: 'city-table',
          label: 'City',
          routerLink: '/master/city-table'
        },

        {
          id: 'account-number',
          label: 'Account Number',
          routerLink: '/master/account-number'
        },
        {
          id: 'number-preference',
          label: 'Number Preference',
          routerLink: '/master/number-preference'
        },
        {
          id: 'customer-table',
          label: 'Customer',
          routerLink: '/customer-information'
        },
        {
          id: 'loan-product',
          label: 'Loan Product',
          routerLink: '/master/loan-product'
        },
        {
          id: 'loan-account',
          label: 'Loan Account',
          routerLink: '/master/loan-account'
        },

        {
          id: 'savings-product',
          label: 'Savings Product',
          routerLink: '/master/savings-product'
        },
        {
          id: 'savings-account',
          label: 'Savings Account',
          routerLink: '/master/savings-account'
        },
        {
          id: 'fd-product',
          label: 'FD Product',
          routerLink: '/master/fd-product'
        },
        {
          id: 'fd-account',
          label: 'FD Account',
          routerLink: '/master/fd-account'
        },
        {
          id: 'rd-product',
          label: 'Rd Product',
          routerLink: '/master/rd-product'
        },

        {
          id: 'rd-account',
          label: 'Rd Account',
          routerLink: '/master/rd-account'
        }
      ]
    },
    {
      label: 'Transection',
      items: [
        {
          label: 'Savings Transection',
          items: [
            {
              id: 'savings-credit-cash',
              label: 'Credit Cash',
              routerLink: '/transection/savings-transection/saving-credit-cash'
            },
            {
              id: 'savings-credit-transfer',
              label: 'Credit Transfer',
              routerLink: '/transection/savings-transection/saving-credit-transfer'
            },
            {
              id: 'savings-debit-cash',
              label: 'Debit Cash',
              routerLink: '/transection/savings-transection/saving-debit-cash'
            },
            {
              id: 'savings-debit-transfer',
              label: 'Debit Transfer',
              routerLink: '/transection/savings-transection/saving-debit-transfer'
            }
          ]
        },
        {
          label: 'RD Transection',
          items: [
            {
              id: 'rd-credit-cash',
              label: 'Credit Cash',
              routerLink: '/transection/rd-transection/rd-credit-cash'
            },
            {
              id: 'rd-credit-transfer',
              label: 'Credit Transfer',
              routerLink: '/transection/rd-transection/rd-credit-transfer'
            },
            {
              id: 'rd-debit-cash',
              label: 'Debit Cash',
              routerLink: '/transection/rd-transection/rd-debit-cash'
            },
            {
              id: 'rd-debit-transfer',
              label: 'Debit Transfer',
              routerLink: '/transection/rd-transection/rd-debit-transfer'
            },
            {
              id: 'rd-account-close',
              label: 'Account Close',
              routerLink: '/transection/rd-transection/rd-account-close'
            }
          ]
        }
      ]
    }
  ];
}
