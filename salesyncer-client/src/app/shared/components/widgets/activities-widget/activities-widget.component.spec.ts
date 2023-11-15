import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesWidgetComponent } from './activities-widget.component';

describe('ActivitiesWidgetComponent', () => {
  let component: ActivitiesWidgetComponent;
  let fixture: ComponentFixture<ActivitiesWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesWidgetComponent]
    });
    fixture = TestBed.createComponent(ActivitiesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
