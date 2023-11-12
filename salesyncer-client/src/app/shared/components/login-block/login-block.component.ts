import { Component,Input,Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-block',
  templateUrl: './login-block.component.html',
  styleUrls: ['./login-block.component.scss'],
})
export class LoginBlockComponent {

  @Input() title!:string;
  @Output() sendCredentials: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
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

  onSubmit(data: any) {
    this.submitted = true;
    if (data.status === 'VALID') {
      const { email, password } = data.value;
      const credentials = { email, password };
    this.sendCredentials.emit(credentials);
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  
  togglePasswordVisibility(event: Event): void {
    event.preventDefault();
    this.hide = !this.hide;
  }
}
