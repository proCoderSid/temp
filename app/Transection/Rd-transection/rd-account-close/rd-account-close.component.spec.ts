import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdAccountCloseComponent } from './rd-account-close.component';

describe('RdAccountCloseComponent', () => {
  let component: RdAccountCloseComponent;
  let fixture: ComponentFixture<RdAccountCloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdAccountCloseComponent]
    });
    fixture = TestBed.createComponent(RdAccountCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
