import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeadSourceComponent } from './manage-lead-source.component';

describe('ManageLeadSourceComponent', () => {
  let component: ManageLeadSourceComponent;
  let fixture: ComponentFixture<ManageLeadSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageLeadSourceComponent]
    });
    fixture = TestBed.createComponent(ManageLeadSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
