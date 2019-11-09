import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerComponentComponent } from './broker-component.component';

describe('BrokerComponentComponent', () => {
  let component: BrokerComponentComponent;
  let fixture: ComponentFixture<BrokerComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokerComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
