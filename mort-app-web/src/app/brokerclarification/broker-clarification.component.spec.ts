import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerClarificationComponent } from './broker-clarification.component';

describe('BrokerClarificationComponent', () => {
  let component: BrokerClarificationComponent;
  let fixture: ComponentFixture<BrokerClarificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerClarificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerClarificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
