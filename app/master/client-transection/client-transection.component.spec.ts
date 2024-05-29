import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTransectionComponent } from './client-transection.component';

describe('ClientTransectionComponent', () => {
  let component: ClientTransectionComponent;
  let fixture: ComponentFixture<ClientTransectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientTransectionComponent]
    });
    fixture = TestBed.createComponent(ClientTransectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
