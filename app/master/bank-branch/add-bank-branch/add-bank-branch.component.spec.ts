import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBankBranchComponent } from './add-bank-branch.component';

describe('AddBankBranchComponent', () => {
  let component: AddBankBranchComponent;
  let fixture: ComponentFixture<AddBankBranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBankBranchComponent]
    });
    fixture = TestBed.createComponent(AddBankBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
