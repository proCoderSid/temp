import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsProductComponent } from './savings-product.component';

describe('SavingsProductComponent', () => {
  let component: SavingsProductComponent;
  let fixture: ComponentFixture<SavingsProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsProductComponent]
    });
    fixture = TestBed.createComponent(SavingsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
