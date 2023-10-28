import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { selectContactsData } from 'src/app/employee/store/selectors/contacts.selectors ';
import * as ContactsActions from 'src/app/employee/store/actions/contacts.actions ';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit, AfterViewInit {
  contactData!: any;
  selectedContactData!: any;
  branchData!: any;
  showSpinner: boolean = false;


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'contactId',
    'place',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sharedAPI: SharedApiService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(ContactsActions.retrieveContactsData());

    this.store.select(selectContactsData).subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
      console.log('Contactdata Got from selector', this.dataSource);
      // this.dataSource = new MatTableDataSource(this.employeesData);
    });
  }

  getBranchData() {
    this.sharedAPI.getBranches().subscribe((response: any) => {
      if (response.status == 'OK') {
        this.branchData = response.branchData;
        // console.log(this.branchData);
      } else {
        console.log(response.message);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  navCreateContact() {

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/contacts-create']);
    } else {
      this.router.navigate(['contacts-create']);
    }
  }

  navEditContact(_id: string) {

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/contacts-edit'], { queryParams: { _id } });
    } else {
      this.router.navigate(['contacts-edit'], { queryParams: { _id } });
    }


  }
  navViewContact(_id: string) {

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/contacts-view'], { queryParams: { _id } });
    } else {
      this.router.navigate(['contacts-view'], { queryParams: { _id } });
    }
  }

  deleteContact(_id: string) {

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
    this.sharedAPI.deleteContact(_id).subscribe((response)=>{
      if (response.status == 'OK') {
        this.showSpinner = false;
        this.store.dispatch(ContactsActions.retrieveContactsData());

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'User deleted successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        
        
        const currentroute= this.router.url;
        if(currentroute.toString().includes('admin'))
        {
         this.router.navigate(['admin/contacts']);
        }
        else{
          this.router.navigate(['contacts']);
        }
      } else {
        this.showSpinner = false;
        Swal.fire(response.status, response.message, 'error');
      }

    })
  }

  })
}
}
