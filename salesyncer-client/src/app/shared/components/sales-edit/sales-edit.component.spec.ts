import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEditComponent } from './sales-edit.component';

describe('SalesEditComponent', () => {
  let component: SalesEditComponent;
  let fixture: ComponentFixture<SalesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesEditComponent]
    });
    fixture = TestBed.createComponent(SalesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
