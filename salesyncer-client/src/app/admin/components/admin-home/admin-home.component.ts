import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {


  userName: string = 'Admin';
  adminMenu:any = [
    { icon: 'dashboard', text: 'Dashboard', link: '/admin' },
    { icon: 'person', text: 'Employees', link: '/admin/employees' },
    { icon: 'contact_phone', text: 'Contact', link: '/' },
    { icon: 'business_center', text: 'Leads', link: '/' },
    { icon: 'task', text: 'Activity', link: '/' },
    { icon: 'shopping_cart', text: 'Products', link: '/' },
    { icon: 'trending_up', text: 'Sales', link: '/' },
    { icon: 'filter_center_focus', text: 'Target', link: '/' },
    { icon: 'monetization_on', text: 'Expense', link: '/' },
    { icon: 'settings', text: 'Configure', link: '/' },
    { icon: 'insert_drive_file', text: 'Documents', link: '/' },
  ];

}
