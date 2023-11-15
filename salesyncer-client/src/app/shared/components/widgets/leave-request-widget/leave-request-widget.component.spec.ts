import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestWidgetComponent } from './leave-request-widget.component';

describe('LeaveRequestWidgetComponent', () => {
  let component: LeaveRequestWidgetComponent;
  let fixture: ComponentFixture<LeaveRequestWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestWidgetComponent]
    });
    fixture = TestBed.createComponent(LeaveRequestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
