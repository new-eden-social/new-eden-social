import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporationComponent } from './corporation.component';

describe('AllianceComponent', () => {
  let component: CorporationComponent;
  let fixture: ComponentFixture<CorporationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
