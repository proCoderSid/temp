import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFdAccountComponent } from './add-fd-account.component';

describe('AddFdAccountComponent', () => {
  let component: AddFdAccountComponent;
  let fixture: ComponentFixture<AddFdAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFdAccountComponent]
    });
    fixture = TestBed.createComponent(AddFdAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
