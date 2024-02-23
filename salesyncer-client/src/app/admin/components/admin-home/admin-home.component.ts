import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent {



  userName: string = 'Admin';
  adminMenu:Object[] = [
    { icon: 'dashboard', text: 'Dashboard', link: '/admin' },
    { icon: 'person', text: 'Employees', link: '/admin/employees' },
    { icon: 'event', text: 'Leave request', link: '/admin/leave-request' },
    { icon: 'contact_phone', text: 'Contact', link: '/admin/contacts' },
    { icon: 'business_center', text: 'Leads', link: '/admin/leads' },
    { icon: 'task', text: 'Activity', link: '/admin/activities' },
    { icon: 'shopping_cart', text: 'Products', link: '/admin/products' },
    { icon: 'trending_up', text: 'Sales', link: '/admin/sales' },
    { icon: 'filter_center_focus', text: 'Target', link: '/admin/target' },
    // { icon: 'monetization_on', text: 'Expense', link: '/' },
    { icon: 'settings', text: 'Manage', link: '/admin/manage' },
    // { icon: 'insert_drive_file', text: 'Documents', link: '/' },
  ];

constructor(
    private route: Router,
  ) {}

  logout() {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
   
    this.route.navigate(['/admin-login']);
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Logged out successfully',
    });
  }




}
