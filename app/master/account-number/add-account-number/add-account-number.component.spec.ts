import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountNumberComponent } from './add-account-number.component';

describe('AddAccountNumberComponent', () => {
  let component: AddAccountNumberComponent;
  let fixture: ComponentFixture<AddAccountNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountNumberComponent]
    });
    fixture = TestBed.createComponent(AddAccountNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
