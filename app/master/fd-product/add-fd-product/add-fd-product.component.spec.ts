import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFdProductComponent } from './add-fd-product.component';

describe('AddFdProductComponent', () => {
  let component: AddFdProductComponent;
  let fixture: ComponentFixture<AddFdProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFdProductComponent]
    });
    fixture = TestBed.createComponent(AddFdProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
