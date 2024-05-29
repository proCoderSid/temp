import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdDebitTransferComponent } from './rd-debit-transfer.component';

describe('RdDebitTransferComponent', () => {
  let component: RdDebitTransferComponent;
  let fixture: ComponentFixture<RdDebitTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdDebitTransferComponent]
    });
    fixture = TestBed.createComponent(RdDebitTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
