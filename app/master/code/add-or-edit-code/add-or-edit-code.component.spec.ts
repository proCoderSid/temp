import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCodeComponent } from './add-or-edit-code.component';

describe('AddOrEditCodeComponent', () => {
  let component: AddOrEditCodeComponent;
  let fixture: ComponentFixture<AddOrEditCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddOrEditCodeComponent]
    });
    fixture = TestBed.createComponent(AddOrEditCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
