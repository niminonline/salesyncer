import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavbarMenuComponent } from './side-navbar-menu.component';

describe('SideNavbarMenuComponent', () => {
  let component: SideNavbarMenuComponent;
  let fixture: ComponentFixture<SideNavbarMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavbarMenuComponent]
    });
    fixture = TestBed.createComponent(SideNavbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
