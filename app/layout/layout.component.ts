import { Component } from '@angular/core';
import { Debounce } from '../core/decorators/debounce.decorator';
import { DesignService } from '../core/services/design.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private ds: DesignService) {}

  @Debounce(150)
  onResizeBanner() {
    this.ds.setBannerHeight();
  }

  @Debounce(150)
  onResizeHeader() {
    this.ds.setHeaderHeight();
  }

  @Debounce(150)
  onResizeSidebar() {
    this.ds.setSidebarWidth();
  }

  @Debounce(150)
  onResizeBreadcrumb() {
    this.ds.setBreadcrumbHeight();
  }

  @Debounce(150)
  onResizeFooter() {
    this.ds.setFooterHeight();
  }
}
