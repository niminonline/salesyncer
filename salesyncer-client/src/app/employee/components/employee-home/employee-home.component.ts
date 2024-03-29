import { Component, OnInit } from '@angular/core';
import * as AuthActions from '../../../shared/store/actions/auth.actions'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { selectEmployeeData } from '../../../shared/store/selectors/user.selectors'
import * as UserActions from '../../../shared/store/actions/user.actions';


@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit{


  userName!: string;
  userMenu:Array<Object> = [
    { icon: 'dashboard', text: 'Dashboard', link: '/' },
    { icon: 'person', text: 'Profile', link: '/profile' },
    { icon: 'event', text: 'Leave', link: '/leave' },
    { icon: 'contact_phone', text: 'Contact', link: '/contacts' },
    { icon: 'business_center', text: 'Leads', link: '/leads' },
    { icon: 'task', text: 'Activity', link: '/activities' },
    { icon: 'shopping_cart', text: 'Products', link: '/products' },
    { icon: 'trending_up', text: 'Sales', link: '/sales' },
    { icon: 'filter_center_focus', text: 'Target', link: '/target' },

  ];

  constructor(
    private route: Router,
    private store: Store,
    
  ) {}

  ngOnInit(){

    this.getemployeeData();
    }

 
  async getemployeeData() {


    const _id: string | null = localStorage.getItem('_id');
    const token: string | null = localStorage.getItem('token');
    if (_id&& token) {
      this.store.dispatch(AuthActions.setUserId({ _id }));
      this.store.dispatch(AuthActions.setUserToken({ token }));

      this.store.dispatch(UserActions.retrieveEmployeeData());

      this.store.select(selectEmployeeData).subscribe((employeeData) => {
        if (employeeData) {
          this.userName = employeeData.name;
                   
        }
      });
    } else {
      Swal.fire('Error', 'Unauthorized Access', 'error');
      this.route.navigate(['/login']);
    }
  }


  logout() {
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    this.store.dispatch(UserActions.clearEmployeeData());
    this.store.dispatch(AuthActions.clearAuthState());
    this.route.navigate(['/login']);
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
