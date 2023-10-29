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
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit, AfterViewInit  {

  leadsData!: any;
  selectedContactData!: any;
  branchData!: any;
  showSpinner: boolean = false;


  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'leadId',
    'clientName',
    'type',
    'product',
    'status',
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

    this.sharedAPI.getLeads().subscribe((response)=>{
      this.leadsData= response.leadsData;
      this.dataSource = new MatTableDataSource(this.leadsData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;
    })
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

  navCreateLead() {

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads-create']);
    } else {
      this.router.navigate(['leads-create']);
    }
  }

  navEditLead(_id: string) {

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads-edit'], { queryParams: { _id } });
    } else {
      this.router.navigate(['leads-edit'], { queryParams: { _id } });
    }


  }
  navViewLead(_id: string) {

    const currentroute = this.router.url;
    if (currentroute.toString().includes('admin')) {
      this.router.navigate(['admin/leads-view'], { queryParams: { _id } });
    } else {
      this.router.navigate(['leads-view'], { queryParams: { _id } });
    }
  }

  deleteLead(_id: string) {

    Swal.fire({
      title: 'Confirmation',
      text: `Are you sure to delete the lead?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33  ',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
    
    this.showSpinner = true;
    this.sharedAPI.deleteLead(_id).subscribe((response)=>{
      if (response.status == 'OK') {
        this.showSpinner = false;
        this.store.dispatch(ContactsActions.retrieveContactsData());

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Lead deleted successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        
        
        const currentroute= this.router.url;
        if(currentroute.toString().includes('admin'))
        {
         this.router.navigate(['admin/leads']);
        }
        else{
          this.router.navigate(['leads']);
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
