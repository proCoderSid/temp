import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdProductComponent } from './fd-product.component';

describe('FdProductComponent', () => {
  let component: FdProductComponent;
  let fixture: ComponentFixture<FdProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdProductComponent]
    });
    fixture = TestBed.createComponent(FdProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
