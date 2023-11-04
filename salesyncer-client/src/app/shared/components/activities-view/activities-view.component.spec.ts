import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesViewComponent } from './activities-view.component';

describe('ActivitiesViewComponent', () => {
  let component: ActivitiesViewComponent;
  let fixture: ComponentFixture<ActivitiesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesViewComponent]
    });
    fixture = TestBed.createComponent(ActivitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
