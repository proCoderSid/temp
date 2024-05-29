import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DesignService } from 'src/app/core/services/design.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  pageTitle: string = '';
  subscription?: Subscription;
  titleSubscription?: Subscription;

  constructor(private ds: DesignService) {}

  ngOnInit() {
    this.subscription = this.ds.breadcrumbList$.subscribe((data) => (this.items = data));
    this.titleSubscription = this.ds.pageTitle$.subscribe((data) => (this.pageTitle = data));

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
