import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingsProductComponent } from './add-savings-product.component';

describe('AddSavingsProductComponent', () => {
  let component: AddSavingsProductComponent;
  let fixture: ComponentFixture<AddSavingsProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSavingsProductComponent]
    });
    fixture = TestBed.createComponent(AddSavingsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
