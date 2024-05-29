import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalukaTableComponent } from './taluka-table.component';

describe('TalukaTableComponent', () => {
  let component: TalukaTableComponent;
  let fixture: ComponentFixture<TalukaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalukaTableComponent]
    });
    fixture = TestBed.createComponent(TalukaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
