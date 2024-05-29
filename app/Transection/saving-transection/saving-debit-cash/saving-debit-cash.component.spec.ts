import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingDebitCashComponent } from './saving-debit-cash.component';

describe('SavingDebitCashComponent', () => {
  let component: SavingDebitCashComponent;
  let fixture: ComponentFixture<SavingDebitCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingDebitCashComponent]
    });
    fixture = TestBed.createComponent(SavingDebitCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
