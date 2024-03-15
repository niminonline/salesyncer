import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Store } from '@ngrx/store';
import { selectContactsData } from 'src/app/shared/store/selectors/contacts.selectors';
import * as branchDataActions from '../../../shared/store/actions/branchData.actions';
import * as leadsDataActions from '../../../shared/store/actions/leadsData.actions';
import * as leadSourceDataActions from '../../../shared/store/actions/leadSourceData.actions';
import * as productsDataActions from '../../../shared/store/actions/productsData.actions';
import * as productCategoriesDataActions from '../../../shared/store/actions/productCategoriesData.actions';
import * as employeesDataActions from '../../../shared/store/actions/employeesData.actions';





import * as ContactsActions from 'src/app/shared/store/actions/contacts.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements DoCheck {
  leadsData!: any;
  selectedContactData!: any;
  branchData!: any;
  showSpinner: boolean = false;
  allLeadsCount!: number;
  newLeadsCount!: number;
  inProgressLeadsCount!: number;
  negotiationLeadsCount!: number;
  convertedLeadsCount!: number;
  failedLeadsCount!: number;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'leadId',
    'clientName',
    'type',
    'product',
    'status',
    'lastUpdate',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sharedAPI: SharedApiService,
    private router: Router,
    private store: Store
  ) {}

  ngDoCheck() {
    

      this.store.dispatch(leadsDataActions.retrieveLeadsData());



    setInterval(()=>{

      this.store.dispatch(branchDataActions.retrieveBranchData());

    },500);
    setInterval(()=>{

      this.store.dispatch(leadSourceDataActions.retrieveLeadSourceData());

    },1500);
    setInterval(()=>{

      this.store.dispatch(productsDataActions.retrieveProductsData());

    },2000);
    setInterval(()=>{

      this.store.dispatch(productCategoriesDataActions.retrieveProductCategoriesData());

    },2500);
    setInterval(()=>{

      this.store.dispatch(employeesDataActions.retrieveEmployeesData());

    },3000);
    


    this.sharedAPI.getLeads().subscribe((response) => {
      this.leadsData = response.leadsData;
      this.allLeadsCount = this.leadsData.length;
      this.newLeadsCount = this.leadsData.filter(
        (lead: any) => lead.status == 'New'
      ).length;
      this.inProgressLeadsCount = this.leadsData.filter(
        (lead: any) => lead.status == 'In Progress'
      ).length;
      this.negotiationLeadsCount = this.leadsData.filter(
        (lead: any) => lead.status == 'Negotiation'
      ).length;
      this.convertedLeadsCount = this.leadsData.filter(
        (lead: any) => lead.status == 'Converted'
      ).length;
      this.failedLeadsCount = this.leadsData.filter(
        (lead: any) => lead.status == 'Failed'
      ).length;
      this.dataSource = new MatTableDataSource(this.leadsData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterAllLeads() {
    this.dataSource = new MatTableDataSource(this.leadsData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterNewLeads() {
    const newLeads = this.leadsData.filter((lead: any) => lead.status == 'New');
    this.dataSource = new MatTableDataSource(newLeads);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterInProgressLeads() {
    const newLeads = this.leadsData.filter(
      (lead: any) => lead.status == 'In Progress'
    );
    this.dataSource = new MatTableDataSource(newLeads);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterNegotiationLeads() {
    const newLeads = this.leadsData.filter(
      (lead: any) => lead.status == 'Negotiation'
    );
    this.dataSource = new MatTableDataSource(newLeads);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterConvetertedLeads() {
    const newLeads = this.leadsData.filter(
      (lead: any) => lead.status == 'Converted'
    );
    this.dataSource = new MatTableDataSource(newLeads);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterFailedLeads() {
    const newLeads = this.leadsData.filter(
      (lead: any) => lead.status == 'Failed'
    );
    this.dataSource = new MatTableDataSource(newLeads);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        this.sharedAPI.deleteLead(_id).subscribe((response) => {
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

            const currentUrl = this.router.url;
            if (currentUrl.toString().includes('admin')) {
              this.router
                .navigateByUrl('admin', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['admin/leads']);
                });
            } else {
              this.router
                .navigateByUrl('', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate(['leads']);
                });
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
