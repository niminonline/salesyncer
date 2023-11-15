import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsPipelineWidgetComponent } from './leads-pipeline-widget.component';

describe('LeadsPipelineWidgetComponent', () => {
  let component: LeadsPipelineWidgetComponent;
  let fixture: ComponentFixture<LeadsPipelineWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsPipelineWidgetComponent]
    });
    fixture = TestBed.createComponent(LeadsPipelineWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
