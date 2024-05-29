import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdDebitCashComponent } from './rd-debit-cash.component';

describe('RdDebitCashComponent', () => {
  let component: RdDebitCashComponent;
  let fixture: ComponentFixture<RdDebitCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdDebitCashComponent]
    });
    fixture = TestBed.createComponent(RdDebitCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
