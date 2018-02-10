import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketcapStripComponent } from './marketcap-strip.component';

describe('MarketcapStripComponent', () => {
  let component: MarketcapStripComponent;
  let fixture: ComponentFixture<MarketcapStripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketcapStripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketcapStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
