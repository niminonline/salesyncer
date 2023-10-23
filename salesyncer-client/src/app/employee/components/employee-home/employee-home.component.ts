import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { select } from '@ngrx/store';
import { selectUserId } from '../../store/selectors/auth.selectors';
import { selectuserToken } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit{


  userName: string = 'User';
  userMenu:any = [
    { icon: 'dashboard', text: 'Dashboard', link: '/' },
    { icon: 'person', text: 'Profile', link: '/profile' },
    { icon: 'contact_phone', text: 'Contact', link: '/' },
    { icon: 'business_center', text: 'Leads', link: '/' },
    { icon: 'task', text: 'Activity', link: '/' },
    { icon: 'shopping_cart', text: 'Products', link: '/' },
    { icon: 'trending_up', text: 'Sales', link: '/' },
    { icon: 'filter_center_focus', text: 'Target', link: '/' },
    { icon: 'monetization_on', text: 'Expense', link: '/' },
    { icon: 'insert_drive_file', text: 'Documents', link: '/' },
  ];

  constructor(
    private route: Router,
    private store: Store
  ) {}

  ngOnInit(){

    const email: string | null = localStorage.getItem('email');
    const token: string | null = localStorage.getItem('token');
    if (email&& token) {
      this.store.dispatch(AuthActions.setUserId({ email }));
      this.store.dispatch(AuthActions.setUserToken({ token }));
    }


    // this.store.pipe(select(selectUserId)).subscribe((userId) => {
    //  console.log("user id",userId)
    // });
    // this.store.pipe(select(selectuserToken)).subscribe((userToken) => {
    //  console.log("user token",userToken)
    // });
  }


  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
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
