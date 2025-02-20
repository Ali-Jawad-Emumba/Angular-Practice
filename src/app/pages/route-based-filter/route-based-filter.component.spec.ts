import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBasedFilterComponent } from './route-based-filter.component';

describe('RouteBasedFilterComponent', () => {
  let component: RouteBasedFilterComponent;
  let fixture: ComponentFixture<RouteBasedFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteBasedFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteBasedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
