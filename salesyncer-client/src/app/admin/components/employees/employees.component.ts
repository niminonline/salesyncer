import { Component,OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { Router } from '@angular/router';
import { AdminDataRepoService } from '../../services/admin-data-repo.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';





@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit,AfterViewInit  {
branchData!:any;
tableData!:any;
// displayedColumns!:any;
employeesData:any;
dataSource!: MatTableDataSource<any>;
selectedEmployeeData!:any;

displayedColumns: string[] = ['name', 'empId', 'branch','email','phone','role','designation','actions'];
positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
position = new FormControl(this.positionOptions[0]);

@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



constructor(private sharedAPI:SharedApiService, private router:Router,private adminDataRepo:AdminDataRepoService){}


ngOnInit(){

  this.sharedAPI.getBranches().subscribe((response:any)=>{
    if(response.status=='OK'){

      this.branchData=response.branchData;
      // console.log(this.branchData);
    }
    else{
      console.log(response.message);
    }
  })

  this.sharedAPI.getEmployeesData().subscribe((response:any)=>{
    if(response.status=='OK'){

      console.log(response);
      this.employeesData=response.employeesData;

      this.dataSource = new MatTableDataSource(this.employeesData);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort = this.sort;

     


      //this.tableData.actions= `<button mat-button >Click me</button>`
    }
    else{
      console.log(response.message);
    }
  })

    // this.displayedColumns = [
    //   {
    //     name: 'Employee Id',
    //     property: 'empId',
    //     sortable: 'empIdSortable',
    //   },
    //   {
    //     name: ' Name',
    //     property: 'name',
    //     sortable: 'nameSortable',
    //   },
    //   {
    //     name: 'Email',
    //     property: 'email',
    //     sortable: 'emailSortable',
    //   },
    //   {
    //     name: 'Phone',
    //     property: 'phone',
    //     sortable: 'phoneSortable',
    //   },
    //   {
    //     name: 'Role',
    //     property: 'role',
    //     sortable: 'roleSortable',
    //   },
    //   {
    //     name: 'Designation',
    //     property: 'designation',
    //     sortable: 'designationSortable',
    //   },
    //   {
    //     name: 'Branch',
    //     property: 'branch',
    //     sortable: 'branchSortable',
    //   }]


    
 

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



addUser(){
this.router.navigate(['admin/add-user'])
}

navViewEmployee(_id:string){

  this.selectedEmployeeData= this.employeesData.find((employee:any)=>{
    return employee._id==_id; 
    
  })
  
  this.adminDataRepo.setSelectedEmpData(this.selectedEmployeeData);
  //  console.log(this.adminDataRepo.getSelectedEmpData())
  this.router.navigate(['admin/view-employee'])


}

navUpdateEmployee(_id:string){

  console.log(this.employeesData);
  this.selectedEmployeeData= this.employeesData.find((employee:any)=>{
    return employee._id==_id; 
  })

  this.adminDataRepo.setSelectedEmpData({...this.selectedEmployeeData});
//  console.log(this.adminDataRepo.getSelectedEmpData())

this.router.navigate(['admin/update-employee'])

}
 

}
