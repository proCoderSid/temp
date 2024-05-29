import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingTableComponent } from './loading-table.component';

describe('LoadingTableComponent', () => {
  let component: LoadingTableComponent;
  let fixture: ComponentFixture<LoadingTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingTableComponent]
    });
    fixture = TestBed.createComponent(LoadingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
