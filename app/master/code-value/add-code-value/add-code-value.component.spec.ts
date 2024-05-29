import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodeValueComponent } from './add-code-value.component';

describe('AddCodeValueComponent', () => {
  let component: AddCodeValueComponent;
  let fixture: ComponentFixture<AddCodeValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCodeValueComponent]
    });
    fixture = TestBed.createComponent(AddCodeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
