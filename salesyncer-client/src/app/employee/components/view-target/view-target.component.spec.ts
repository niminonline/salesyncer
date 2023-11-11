import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTargetComponent } from './view-target.component';

describe('ViewTargetComponent', () => {
  let component: ViewTargetComponent;
  let fixture: ComponentFixture<ViewTargetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTargetComponent]
    });
    fixture = TestBed.createComponent(ViewTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
