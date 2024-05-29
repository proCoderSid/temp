import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdAccountComponent } from './rd-account.component';

describe('RdAccountComponent', () => {
  let component: RdAccountComponent;
  let fixture: ComponentFixture<RdAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RdAccountComponent]
    });
    fixture = TestBed.createComponent(RdAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
