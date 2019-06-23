import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllianceComponent } from './alliance.component';

describe('AllianceComponent', () => {
  let component: AllianceComponent;
  let fixture: ComponentFixture<AllianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
