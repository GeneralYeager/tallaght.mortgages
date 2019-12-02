import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwritingClarificationComponent } from './underwriting-clarification.component';

describe('UnderwritingClarificationComponent', () => {
  let component: UnderwritingClarificationComponent;
  let fixture: ComponentFixture<UnderwritingClarificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderwritingClarificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwritingClarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
