import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { selectContactsData } from 'src/app/employee/store/selectors/contacts.selectors ';
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
  _id!: string;
  contactsData!: any;
  selectedContactData!: ContactType;

  ngOnInit() {
    this.getBranchData();
    this.getContactsData();
    const _id= this.activatedRouter.snapshot.queryParamMap.get('_id');
    console.log("selected contact",_id);
    this.selectedContactData=this.contactsData.find((contact:ContactType)=>contact._id==_id);

    this.contactGroup = this.fb.group({
      name: [this.selectedContactData.name, [Validators.required, Validators.pattern('^[A-Za-z \\.]+')]],
      branch: [this.selectedContactData.branch, [Validators.required]],

      email: [
        this.selectedContactData.email,
        [
          Validators.required,
          Validators.pattern('^[^ ][a-z.\\-_0-9]+@[a-z0-9]+\\.[a-z]{2,10}'),
        ],
      ],
      phone: [this.selectedContactData.phone, [Validators.required, Validators.pattern('^\\d{10}$')]],
      address: [this.selectedContactData.address, [Validators.required]],
      profession: [this.selectedContactData.profession],
      type: [this.selectedContactData.type],
      place: [this.selectedContactData.place, [Validators.required]],
      pincode: [this.selectedContactData.pincode, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      language: [
        this.selectedContactData.language,
      ],
    });
  }

  getContactsData() {
    this.store.select(selectContactsData).subscribe((response) => {
      if (response) {
        this.contactsData = response;
        console.log("Response",this.contactsData)
      } else {
        console.log('Employee fetching from state failed');
      }
    });
  }

  getBranchData() {
    console.log('Entered branch');

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
      this.showSpinner=true;

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
        _id: this.selectedContactData._id,
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

      this.sharedAPI.editContat(body).subscribe((response) => {
        // console.log(response);
        if (response && response.status !== 'OK') {
          this.showSpinner=false;
          Swal.fire('Error', response.message, 'error');
        } else {
          this.showSpinner=false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'User registered successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          const currentUrl = this.router.url;
          this.router.navigate(['contacts']);
        }
      });
    } else {
      Swal.fire('Error', 'Please fill the fields without errors', 'error');
    }
  }

  navContacts(){
    this.router.navigate(['contacts'])
  }
}
