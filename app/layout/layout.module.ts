import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HistoryComponent } from './history/history.component';
import { LayoutComponent } from './layout.component';
import { LoaderComponent } from './loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    SidebarComponent,
    BreadcrumbComponent,
    HistoryComponent,
    LayoutComponent,
    LoaderComponent
  ],
  imports: [SharedModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    SidebarComponent,
    BreadcrumbComponent,
    HistoryComponent,
    LayoutComponent,
    LoaderComponent
  ]
})
export class LayoutModule {}
