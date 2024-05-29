import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoAddEditComponentComponent } from './demo-add-edit-component.component';

describe('DemoAddEditComponentComponent', () => {
  let component: DemoAddEditComponentComponent;
  let fixture: ComponentFixture<DemoAddEditComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoAddEditComponentComponent]
    });
    fixture = TestBed.createComponent(DemoAddEditComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
