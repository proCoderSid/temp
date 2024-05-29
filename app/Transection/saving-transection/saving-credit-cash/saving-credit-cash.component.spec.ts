import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingCreditCashComponent } from './saving-credit-cash.component';

describe('SavingCreditCashComponent', () => {
  let component: SavingCreditCashComponent;
  let fixture: ComponentFixture<SavingCreditCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingCreditCashComponent]
    });
    fixture = TestBed.createComponent(SavingCreditCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
