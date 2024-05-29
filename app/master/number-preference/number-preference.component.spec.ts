import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPreferenceComponent } from './number-preference.component';

describe('NumberPreferenceComponent', () => {
  let component: NumberPreferenceComponent;
  let fixture: ComponentFixture<NumberPreferenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberPreferenceComponent]
    });
    fixture = TestBed.createComponent(NumberPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
