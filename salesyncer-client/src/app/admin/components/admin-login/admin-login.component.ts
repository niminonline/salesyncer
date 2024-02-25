import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAPIService } from '../../services/admin-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  title: string = 'Admin Login';

  constructor(private route: Router, private api: AdminAPIService) {}

  handleCredentials(credentials: Event) {
    this.api.login(credentials).subscribe((response) => {
      try{

        if (response.status !== 'OK' && response.message) {
          Swal.fire('Error', response.message, 'error');
        } else {
          if (response.token ) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', "admin");
          }
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
            title: 'Signed in successfully',
          });
  
          this.route.navigate(['/admin']);
        }
      }
      catch(error){
        Swal.fire('Error', "Something went wrong. please contact your application vendor", 'error');
      }
    });
  }
}
