import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchListComponent } from './add-branch-list.component';

describe('AddBranchListComponent', () => {
  let component: AddBranchListComponent;
  let fixture: ComponentFixture<AddBranchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBranchListComponent]
    });
    fixture = TestBed.createComponent(AddBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
