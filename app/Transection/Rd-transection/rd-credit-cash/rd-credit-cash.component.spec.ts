import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdCreditCashComponent } from './rd-credit-cash.component';

describe('RdCreditCashComponent', () => {
  let component: RdCreditCashComponent;
  let fixture: ComponentFixture<RdCreditCashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdCreditCashComponent]
    });
    fixture = TestBed.createComponent(RdCreditCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
