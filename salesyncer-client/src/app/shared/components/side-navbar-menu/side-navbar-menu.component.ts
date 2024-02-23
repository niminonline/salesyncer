import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar-menu',
  templateUrl: './side-navbar-menu.component.html',
  styleUrls: ['./side-navbar-menu.component.scss']
})
export class SideNavbarMenuComponent {
  @Input() menuItems!:Array<any>;
  selectedMenuItem: number | null = null;


  constructor(private router:Router){}

  navigateToLink(link: string,menuItem: number) {
    this.router.navigate([link]);
    this.selectedMenuItem = menuItem;
  }

}
