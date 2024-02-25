import { Component,OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { AdminAPIService } from '../../services/admin-api.service';
import { Branch, BranchData } from 'src/app/shared/interfaces/interfaces';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnDestroy {
  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router,
    private adminAPI: AdminAPIService
  ) {}

  submitted: boolean = false;
  private addEmployeeSubscription: Subscription | undefined;

  signupGroup!: FormGroup;
  branchData!: Branch[];
  showSpinner: boolean = false;

  getBranchData() {
    this.sharedAPI.getBranches().subscribe((response: BranchData) => {
      if (response.status == 'OK') {
        this.branchData = response.branchData;
      } else {
        console.error(response.message);
      }
    });
  }

  ngOnInit() {
    this.getBranchData();

    this.signupGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z \\.]+')]],
      selectedBranch: ['', [Validators.required]],

      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
        ],
      ],
      mobile: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      place: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      role: ['', [Validators.required, Validators.pattern('^[A-Za-z \\.]+')]],
      designation: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
      ],
    });
  }

  signupSubmit(data:FormGroup): void {
    this.submitted = true;
    if (!data.invalid) {
      this.showSpinner = true;

      const {
        name,
        selectedBranch,
        email,
        mobile,
        addressLine1,
        addressLine2,
        place,
        pincode,
        role,
        designation,
      } = data.value;
      const body = {
        name,
        selectedBranch,
        email,
        mobile,
        addressLine1,
        addressLine2,
        place,
        pincode,
        role,
        designation,
      };

     


      this.addEmployeeSubscription = this.adminAPI.addEmployee(body).subscribe((response) => {
        if (response && response.status !== 'OK') {
          this.showSpinner = false;

          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User registered successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentUrl = this.router.url;
          this.router.navigate(['admin/employees']);
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  trackByBranch(index: number, branch: Branch): string {
    return branch._id; 
  }



  ngOnDestroy(): void {
    if (this.addEmployeeSubscription) {
      this.addEmployeeSubscription.unsubscribe();
    }
  }

}
