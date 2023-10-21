import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar-menu',
  templateUrl: './side-navbar-menu.component.html',
  styleUrls: ['./side-navbar-menu.component.scss']
})
export class SideNavbarMenuComponent {
  @Input() menuItems!:any;

  constructor(private router:Router){}
  navigateToLink(link: string) {
    this.router.navigate([link]);
  }

}
