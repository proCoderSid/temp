import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNumberPreferenceComponent } from './add-number-preference.component';

describe('AddNumberPreferenceComponent', () => {
  let component: AddNumberPreferenceComponent;
  let fixture: ComponentFixture<AddNumberPreferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNumberPreferenceComponent]
    });
    fixture = TestBed.createComponent(AddNumberPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
