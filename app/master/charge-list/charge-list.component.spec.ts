import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeListComponent } from './charge-list.component';

describe('ChargeListComponent', () => {
  let component: ChargeListComponent;
  let fixture: ComponentFixture<ChargeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChargeListComponent]
    });
    fixture = TestBed.createComponent(ChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
