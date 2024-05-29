import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAddEditComponentComponent } from './bank-add-edit-component.component';

describe('BankAddEditComponentComponent', () => {
  let component: BankAddEditComponentComponent;
  let fixture: ComponentFixture<BankAddEditComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankAddEditComponentComponent]
    });
    fixture = TestBed.createComponent(BankAddEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
