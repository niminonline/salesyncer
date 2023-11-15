import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetWidgetComponent } from './target-widget.component';

describe('TargetWidgetComponent', () => {
  let component: TargetWidgetComponent;
  let fixture: ComponentFixture<TargetWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TargetWidgetComponent]
    });
    fixture = TestBed.createComponent(TargetWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
