import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTalukaComponent } from './add-taluka.component';

describe('AddTalukaComponent', () => {
  let component: AddTalukaComponent;
  let fixture: ComponentFixture<AddTalukaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTalukaComponent]
    });
    fixture = TestBed.createComponent(AddTalukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
