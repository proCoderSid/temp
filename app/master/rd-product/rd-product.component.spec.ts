import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdProductComponent } from './rd-product.component';

describe('RdProductComponent', () => {
  let component: RdProductComponent;
  let fixture: ComponentFixture<RdProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdProductComponent]
    });
    fixture = TestBed.createComponent(RdProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
