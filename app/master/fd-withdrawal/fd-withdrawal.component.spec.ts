import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdWithdrawalComponent } from './fd-withdrawal.component';

describe('FdWithdrawalComponent', () => {
  let component: FdWithdrawalComponent;
  let fixture: ComponentFixture<FdWithdrawalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdWithdrawalComponent]
    });
    fixture = TestBed.createComponent(FdWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
