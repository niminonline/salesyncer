import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsCreateComponent } from './leads-create.component';

describe('LeadsCreateComponent', () => {
  let component: LeadsCreateComponent;
  let fixture: ComponentFixture<LeadsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadsCreateComponent]
    });
    fixture = TestBed.createComponent(LeadsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
