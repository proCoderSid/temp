import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrdAccountComponent } from './add-rd-account.component';

describe('AddArAccountComponent', () => {
  let component: AddrdAccountComponent;
  let fixture: ComponentFixture<AddrdAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddrdAccountComponent]
    });
    fixture = TestBed.createComponent(AddrdAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
