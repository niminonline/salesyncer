import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

@Component({
  selector: 'app-contacts-create',
  templateUrl: './contacts-create.component.html',
  styleUrls: ['./contacts-create.component.scss'],
})
export class ContactsCreateComponent implements OnInit {
  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  submitted: boolean = false;
  contactGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;

  ngOnInit() {
    this.getBranchData();
    this.contactGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z \\.]+')]],
      branch: ['', [Validators.required]],

      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      address: ['', [Validators.required]],
      profession: [''],
      type: ['', [Validators.required]],
      place: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      language: ['', [Validators.required]],
    });
  }

  getBranchData() {
    try {
      this.sharedAPI.getBranches().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.branchData = response.branchData;
          console.log(this.branchData);
        } else {
          console.log(response.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  submitContact(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      // console.log(data.value);
      // console.log('Data', data);
      const {
        name,
        branch,
        email,
        phone,
        address,
        profession,
        place,
        pincode,
        type,
        language,
      } = data.value;
      const body = {
        name,
        branch,
        email,
        phone,
        address,
        profession,
        place,
        pincode,
        type,
        language,
      };
      console.log('Data', body);

      this.sharedAPI.createContact(body).subscribe((response) => {
        // console.log(response);

        this.showSpinner = true;
        if (response && response.status !== 'OK') {
          this.showSpinner = false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Contact created successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentroute = this.router.url;
          if (currentroute.toString().includes('admin')) {
            this.router.navigate(['admin/contacts']);
          } else {
            this.router.navigate(['contacts']);
          }
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  navContacts(event: Event) {
    event.preventDefault();

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/contacts']);
    } else {
      this.router.navigate(['contacts']);
    }
  }
}
