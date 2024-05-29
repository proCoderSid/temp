import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRdProductComponent } from './add-rd-product.component';

describe('AddRdProductComponent', () => {
  let component: AddRdProductComponent;
  let fixture: ComponentFixture<AddRdProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRdProductComponent]
    });
    fixture = TestBed.createComponent(AddRdProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
