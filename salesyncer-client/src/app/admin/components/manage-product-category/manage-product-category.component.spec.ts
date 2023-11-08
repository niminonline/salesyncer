import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductCategoryComponent } from './manage-product-category.component';

describe('ManageProductCategoryComponent', () => {
  let component: ManageProductCategoryComponent;
  let fixture: ComponentFixture<ManageProductCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageProductCategoryComponent]
    });
    fixture = TestBed.createComponent(ManageProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
