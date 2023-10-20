import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-block',
  templateUrl: './login-block.component.html',
  styleUrls: ['./login-block.component.scss'],
})
export class LoginBlockComponent {
  constructor(
    private fb: FormBuilder,
   // private userApi: UserAPIService,
    private router: Router
  ) {}
  submitted: boolean = false;
  hide: boolean = true;
  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[^ ][a-z.-_0-9]+@[a-z0-9]+\\.[a-z]{2,15}'),
      ],
    ],
    password: ['', Validators.required],
  });
  get AllControls() {
    return this.loginForm.controls;
  }

  // onSubmit(data: any) {
  //   this.submitted = true;
  //   if (data.status === 'VALID') {
  //     const { email, password } = data.value;
  //     const credentials = { email, password };
  //     this.userApi.login(credentials).subscribe((response) => {
  //       if (response.status !== 'OK' && response.message) {
  //         Swal.fire('Error', response.message, 'error');
  //       } else {
  //         if (response.token && response.userData?._id) {
  //           localStorage.setItem('userToken', response.token);
  //           localStorage.setItem('_id', response.userData._id);
  //           // this.store.dispatch(retrieveUserData());
  //         }

  //         const Toast = Swal.mixin({
  //           toast: true,
  //           position: 'bottom',
  //           showConfirmButton: false,
  //           timer: 3000,
  //           timerProgressBar: true,
  //           didOpen: (toast) => {
  //             toast.addEventListener('mouseenter', Swal.stopTimer);
  //             toast.addEventListener('mouseleave', Swal.resumeTimer);
  //           },
  //         });

  //         Toast.fire({
  //           icon: 'success',
  //           title: 'Signed in successfully',
  //         });
  //         // console.log(response);

  //         this.router.navigate(['/user-home']);
  //       }
  //     });
  //   } else {
  //     Swal.fire('Error', 'Please fill the fields without errors', 'error');
  //   }
  // }
  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hide = !this.hide;
  }
}
