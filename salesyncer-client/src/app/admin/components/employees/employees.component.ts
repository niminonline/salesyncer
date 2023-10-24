import { Component,OnInit } from '@angular/core';
import { AdminAPIService } from '../../services/admin-api.service';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit  {
branchData!:any;
tableData!:any;
displayedColumns!:any;
employeesData:any;
constructor(private sharedAPI:SharedApiService, private router:Router){}

ngOnInit(){

  this.sharedAPI.getBranches().subscribe((response:any)=>{
    if(response.status=='OK'){

      this.branchData=response.branchData;
      console.log(this.branchData);
    }
    else{
      console.log(response.message);
    }
  })

  this.sharedAPI.getEmployeesData().subscribe((response:any)=>{
    if(response.status=='OK'){

      this.tableData=response.employeesData;
      console.log(this.tableData);

      this.tableData.forEach((row: any) => {
        row.actions = `<button mat-button (click)="onActionButtonClick(${row.empId})">Click me</button>`;
      });
    


      //this.tableData.actions= `<button mat-button >Click me</button>`
    }
    else{
      console.log(response.message);
    }
  })

    this.displayedColumns = [
      {
        name: 'Employee Id',
        property: 'empId',
        sortable: 'empIdSortable',
      },
      {
        name: ' Name',
        property: 'name',
        sortable: 'nameSortable',
      },
      {
        name: 'Email',
        property: 'email',
        sortable: 'emailSortable',
      },
      {
        name: 'Phone',
        property: 'phone',
        sortable: 'phoneSortable',
      },
      {
        name: 'Role',
        property: 'role',
        sortable: 'roleSortable',
      },
      {
        name: 'Designation',
        property: 'designation',
        sortable: 'designationSortable',
      },
      {
        name: 'Branch',
        property: 'branch',
        sortable: 'branchSortable',
      },{
        name: 'Actions',
        property: 'actions',
      }]

 

}



addUser(){
this.router.navigate(['admin/add-user'])
}
 

}
