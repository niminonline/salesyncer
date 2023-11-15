import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesWidgetComponent } from './leaves-widget.component';

describe('LeavesWidgetComponent', () => {
  let component: LeavesWidgetComponent;
  let fixture: ComponentFixture<LeavesWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesWidgetComponent]
    });
    fixture = TestBed.createComponent(LeavesWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
