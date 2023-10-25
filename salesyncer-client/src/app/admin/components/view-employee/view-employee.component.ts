import { Component,OnInit} from '@angular/core';
import { AdminDataRepoService } from '../../services/admin-data-repo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit{

  selectedEmpData!:any;
  token!: string | null;
  empId!: string | null;
  name!: string | undefined;
  branch!: string | undefined;
  email!: string | undefined;
  phone!: string | undefined;
  addressLine1!: string | undefined;
  addressLine2!: string | undefined;
  place!: string | undefined;
  pincode!: string | undefined;
  role!: string | undefined;
  designation!: string | undefined;



  constructor(private adminDataRepo:AdminDataRepoService, private router: Router){  }

  ngOnInit(){

    this.selectedEmpData= this.adminDataRepo.getSelectedEmpData();
    this.name = this.selectedEmpData.name;
    this.empId = this.selectedEmpData.empId;
    this.branch = this.selectedEmpData.branch;
    this.email = this.selectedEmpData.email;
    this.phone = this.selectedEmpData.phone;
    this.addressLine1 = this.selectedEmpData.address.addressLine1;
    this.addressLine2 = this.selectedEmpData.address.addressLine2;
    this.place = this.selectedEmpData.address.place;
    this.pincode = this.selectedEmpData.address.pincode;
    this.role = this.selectedEmpData.role;
    this.designation = this.selectedEmpData.designation;

  }



  navEmployees(){
    this.router.navigate(['admin/employees']);
  }

}
