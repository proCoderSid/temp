import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeValueComponent } from './code-value.component';

describe('CodeValueComponent', () => {
  let component: CodeValueComponent;
  let fixture: ComponentFixture<CodeValueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeValueComponent]
    });
    fixture = TestBed.createComponent(CodeValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
