import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictTableComponent } from './district-table.component';

describe('DistrictTableComponent', () => {
  let component: DistrictTableComponent;
  let fixture: ComponentFixture<DistrictTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictTableComponent]
    });
    fixture = TestBed.createComponent(DistrictTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
