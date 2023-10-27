import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';


import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Store } from '@ngrx/store';
import { selectContactsData, } from 'src/app/employee/store/selectors/contacts.selectors ';
import * as ContactsActions  from 'src/app/employee/store/actions/contacts.actions '



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit,AfterViewInit  {


contactData!:any;
selectedContactData!:any;
branchData!:any;

dataSource!: MatTableDataSource<any>;
displayedColumns: string[] = ['name', 'email', 'phone','contactId','place','actions'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private sharedAPI:SharedApiService, private router:Router,private store: Store){}


ngOnInit(){

  this.store.dispatch(ContactsActions.retrieveContactsData());

  this.store.select(selectContactsData).subscribe((response)=>{

      this.dataSource= new MatTableDataSource(response);
      console.log("Contactdata Got from selector", this.dataSource);
      // this.dataSource = new MatTableDataSource(this.employeesData);
  })
}

getBranchData(){
  this.sharedAPI.getBranches().subscribe((response:any)=>{
    if(response.status=='OK'){

      this.branchData=response.branchData;
      // console.log(this.branchData);
    }
    else{
      console.log(response.message);
    }
  })
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


navCreateContact(){
this.router.navigate(['contacts-create'])
}

navEditContact(_id:string){


  this.router.navigate(['contacts-edit'],{ queryParams: {_id} });
}
navViewContact(_id:string){
  // console.log("ID from html",_id);
  this.router.navigate(['contacts-view'],{ queryParams: {_id} });
}
navDeleteContact(_id:string){
  this.router.navigate(['update-profile']);
}
}


