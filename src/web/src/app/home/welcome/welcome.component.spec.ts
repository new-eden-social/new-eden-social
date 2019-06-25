import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWelcomeComponent } from './welcome.component';

describe('HomeWelcomeComponent', () => {
  let component: HomeWelcomeComponent;
  let fixture: ComponentFixture<HomeWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
