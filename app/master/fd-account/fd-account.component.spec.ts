import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdAccountComponent } from './fd-account.component';

describe('FdAccountComponent', () => {
  let component: FdAccountComponent;
  let fixture: ComponentFixture<FdAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FdAccountComponent]
    });
    fixture = TestBed.createComponent(FdAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
