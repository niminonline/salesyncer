import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsWidgetComponent } from './leads-widget.component';

describe('LeadsWidgetComponent', () => {
  let component: LeadsWidgetComponent;
  let fixture: ComponentFixture<LeadsWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsWidgetComponent]
    });
    fixture = TestBed.createComponent(LeadsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
