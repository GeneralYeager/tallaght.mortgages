import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmortgageComponent } from './newmortgage.component';

describe('NewmortgageComponent', () => {
  let component: NewmortgageComponent;
  let fixture: ComponentFixture<NewmortgageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewmortgageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewmortgageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
