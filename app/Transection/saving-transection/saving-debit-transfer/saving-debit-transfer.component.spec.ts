import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingDebitTransferComponent } from './saving-debit-transfer.component';

describe('SavingDebitTransferComponent', () => {
  let component: SavingDebitTransferComponent;
  let fixture: ComponentFixture<SavingDebitTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingDebitTransferComponent]
    });
    fixture = TestBed.createComponent(SavingDebitTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
