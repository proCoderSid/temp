import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNumberComponent } from './account-number.component';

describe('AccountNumberComponent', () => {
  let component: AccountNumberComponent;
  let fixture: ComponentFixture<AccountNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountNumberComponent]
    });
    fixture = TestBed.createComponent(AccountNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
