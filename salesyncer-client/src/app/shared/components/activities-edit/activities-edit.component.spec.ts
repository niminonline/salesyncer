import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesEditComponent } from './activities-edit.component';

describe('ActivitiesEditComponent', () => {
  let component: ActivitiesEditComponent;
  let fixture: ComponentFixture<ActivitiesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivitiesEditComponent]
    });
    fixture = TestBed.createComponent(ActivitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
