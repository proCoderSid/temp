import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingCreditTransferComponent } from './saving-credit-transfer.component';

describe('SavingCreditTransferComponent', () => {
  let component: SavingCreditTransferComponent;
  let fixture: ComponentFixture<SavingCreditTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingCreditTransferComponent]
    });
    fixture = TestBed.createComponent(SavingCreditTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
