import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActivityTypeComponent } from './manage-activity-type.component';

describe('ManageActivityTypeComponent', () => {
  let component: ManageActivityTypeComponent;
  let fixture: ComponentFixture<ManageActivityTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageActivityTypeComponent]
    });
    fixture = TestBed.createComponent(ManageActivityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
