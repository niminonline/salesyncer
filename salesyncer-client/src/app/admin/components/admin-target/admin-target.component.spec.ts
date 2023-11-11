import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTargetComponent } from './admin-target.component';

describe('AdminTargetComponent', () => {
  let component: AdminTargetComponent;
  let fixture: ComponentFixture<AdminTargetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTargetComponent]
    });
    fixture = TestBed.createComponent(AdminTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
