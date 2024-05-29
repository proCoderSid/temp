import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanProductComponent } from './add-loan-product.component';

describe('AddLoanProductComponent', () => {
  let component: AddLoanProductComponent;
  let fixture: ComponentFixture<AddLoanProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanProductComponent]
    });
    fixture = TestBed.createComponent(AddLoanProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
