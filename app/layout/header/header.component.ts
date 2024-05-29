import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Language } from 'src/app/core/enum/language.enum';
import { PublicService } from 'src/app/core/services/public.service';
declare function changeLanguage(data: any): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  languageList: Array<any> = [];
  selectedLanguage = '';
  selectedTypingLanguage = '';
  items: MenuItem[] = [
    {
      icon: 'pi pi-bars',
      label: '',
      items: [
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
              id: 'customer-table',
              label: 'Customer',
              routerLink: '/customer-information'
            },
            {
              id: 'code-table',
              label: 'Code',
              routerLink: '/master/code-table'
            },
            {
              id: 'code-value-table',
              label: 'Code-Value',
              routerLink: '/master/code-value-table'
            },
            {
              id: 'bank-table',
              label: 'Bank',
              routerLink: '/master/bank-table'
            },
            {
              id: 'bank-branch-table',
              label: 'Bank-Branch',
              routerLink: '/master/bank-branch-table'
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
              id: 'fd-withdrawal',
              label: 'FD WITHDRAWAL',
              routerLink: '/master/fd-withdrawal'
            },
            {
              id: 'rd-product',
              label: 'RD Product',
              routerLink: '/master/rd-product'
            },

            {
              id: 'rd-account',
              label: 'RD Account',
              routerLink: '/master/rd-account'
            }
          ]
        },
        {
          label: 'Transaction',
          items: [
            {
              label: 'Savings Transaction',
              items: [
                {
                  id: 'savings-credit-cash',
                  label: 'Credit Cash',
                  routerLink: '/transaction/savings-transaction/saving-credit-cash'
                },
                {
                  id: 'savings-credit-transfer',
                  label: 'Credit Transfer',
                  routerLink: '/transaction/savings-transaction/saving-credit-transfer'
                },
                {
                  id: 'savings-debit-cash',
                  label: 'Debit Cash',
                  routerLink: '/transaction/savings-transaction/saving-debit-cash'
                },
                {
                  id: 'savings-debit-transfer',
                  label: 'Debit Transfer',
                  routerLink: '/transaction/savings-transaction/saving-debit-transfer'
                }
              ]
            },
            {
              label: 'RD Transaction',
              items: [
                {
                  id: 'rd-credit-cash',
                  label: 'Credit Cash',
                  routerLink: '/transaction/rd-transaction/rd-credit-cash'
                },
                {
                  id: 'rd-credit-transfer',
                  label: 'Credit Transfer',
                  routerLink: '/transaction/rd-transaction/rd-credit-transfer'
                },
                {
                  id: 'rd-debit-cash',
                  label: 'Debit Cash',
                  routerLink: '/transaction/rd-transaction/rd-debit-cash'
                },
                {
                  id: 'rd-debit-transfer',
                  label: 'Debit Transfer',
                  routerLink: '/transaction/rd-transaction/rd-debit-transfer'
                },
                {
                  id: 'rd-account-close',
                  label: 'Account Close',
                  routerLink: '/transaction/rd-transaction/rd-account-close'
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private translate: TranslateService,
    public ps: PublicService
  ) {
    this.languageInit();
  }

  languageInit() {
    this.languageList = [];
    Object.entries(Language).every(([key, value]) => this.languageList.push({ key, value }));

    this.selectedLanguage = this.translate.getDefaultLang();
    this.selectedTypingLanguage = (window as any).language;
    changeLanguage(this.selectedTypingLanguage);
  }

  onLanguageChange(language: DropdownChangeEvent): void {
    this.translate.setDefaultLang(language.value);
    this.translate.use(language.value);
  }

  onInputLanguageChange(language: DropdownChangeEvent): void {
    this.ps.setInputLang(language.value);
  }

  onChangeLanguage(event: any) {
    changeLanguage(event.value);
  }
}
