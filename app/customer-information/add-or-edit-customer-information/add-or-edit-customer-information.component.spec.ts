import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCustomerInformationComponent } from './add-or-edit-customer-information.component';

describe('AddOrEditCustomerInformationComponent', () => {
  let component: AddOrEditCustomerInformationComponent;
  let fixture: ComponentFixture<AddOrEditCustomerInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditCustomerInformationComponent]
    });
    fixture = TestBed.createComponent(AddOrEditCustomerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
