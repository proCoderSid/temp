import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdCreditTransferComponent } from './rd-credit-transfer.component';

describe('RdCreditTransferComponent', () => {
  let component: RdCreditTransferComponent;
  let fixture: ComponentFixture<RdCreditTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdCreditTransferComponent]
    });
    fixture = TestBed.createComponent(RdCreditTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
