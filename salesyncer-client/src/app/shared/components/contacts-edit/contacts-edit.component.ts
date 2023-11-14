import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { selectContactsData } from 'src/app/shared/store/selectors/contacts.selectors';
import { ContactType, ContactsType } from '../../interfaces/interfaces';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss'],
})
export class ContactsEditComponent implements OnInit {
  constructor(
    private sharedAPI: SharedApiService,
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  submitted: boolean = false;
  contactGroup!: FormGroup;
  branchData!: any;
  showSpinner: boolean = false;
  _id!: string | null;
  contactsData!: any;
  selectedContactData!: ContactType;

  ngOnInit() {
    this.getBranchData();
    this.getContactsData();
    this._id = this.activatedRouter.snapshot.queryParamMap.get('_id');
    this.selectedContactData = this.contactsData.find(
      (contact: ContactType) => contact._id == this._id
    );

    this.contactGroup = this.fb.group({
      name: [
        this.selectedContactData.name,
        [Validators.required, Validators.pattern('^[A-Za-z \\.]+')],
      ],
      branch: [this.selectedContactData.branch, [Validators.required]],

      email: [
        this.selectedContactData.email,
        [
          Validators.required,
          Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
        ],
      ],
      phone: [
        this.selectedContactData.phone,
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
      address: [this.selectedContactData.address, [Validators.required]],
      profession: [this.selectedContactData.profession],
      type: [this.selectedContactData.type],
      place: [this.selectedContactData.place, [Validators.required]],
      pincode: [
        this.selectedContactData.pincode,
        [Validators.required, Validators.pattern('^[0-9]{6}$')],
      ],
      language: [this.selectedContactData.language],
    });
  }

  getContactsData() {
    this.store.select(selectContactsData).subscribe((response) => {
      if (response) {
        this.contactsData = response;
      } else {
        console.log('Employee fetching from state failed');
      }
    });
  }

  getBranchData() {
    try {
      this.sharedAPI.getBranches().subscribe((response: any) => {
        if (response.status == 'OK') {
          this.branchData = response.branchData;
        } else {
          console.error(response.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  submitContact(data: any): void {
    this.submitted = true;
    if (!data.invalid) {
      this.showSpinner = true;

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
        _id: this._id,
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

      this.sharedAPI.editContact(body).subscribe((response) => {
        // console.log(response);
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

          const currentroute = this.router.url;
          if (currentroute.toString().includes('admin')) {
            this.router.navigate(['admin/contacts']);
          } else {
            this.router.navigate(['contacts']);
          }

          const currentUrl = this.router.url;
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

  deleteContact(event: Event) {
    event.preventDefault();

    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the contact?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = true;
        this.sharedAPI.deleteContact(this._id).subscribe((response) => {
          if (response.status == 'OK') {
            this.showSpinner = false;
            // this.store.dispatch(ContactsActions.retrieveContactsData());

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Contact updated successfully',
              showConfirmButton: false,
              timer: 1500,
            });

            const currentroute = this.router.url;
            if (currentroute.toString().includes('admin')) {
              this.router.navigate(['admin/contacts']);
            } else {
              this.router.navigate(['contacts']);
            }
          } else {
            this.showSpinner = false;
            Swal.fire(response.status, response.message, 'error');
          }
        });
      }
    });
  }
}
