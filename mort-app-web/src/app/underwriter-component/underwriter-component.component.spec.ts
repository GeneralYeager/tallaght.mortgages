import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwriterComponentComponent } from './underwriter-component.component';

describe('UnderwriterComponentComponent', () => {
  let component: UnderwriterComponentComponent;
  let fixture: ComponentFixture<UnderwriterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderwriterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwriterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
