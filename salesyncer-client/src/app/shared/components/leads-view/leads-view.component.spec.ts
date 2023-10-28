import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsViewComponent } from './leads-view.component';

describe('LeadsViewComponent', () => {
  let component: LeadsViewComponent;
  let fixture: ComponentFixture<LeadsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsViewComponent]
    });
    fixture = TestBed.createComponent(LeadsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
