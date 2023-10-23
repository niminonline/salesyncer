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
    { icon: 'settings', text: 'Manage', link: '/admin/manage' },
    { icon: 'insert_drive_file', text: 'Documents', link: '/' },
  ];

constructor(
    private route: Router,
  ) {}

  logout() {
    localStorage.removeItem('admin_email');
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
