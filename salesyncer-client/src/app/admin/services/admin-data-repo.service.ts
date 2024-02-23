import { Injectable } from '@angular/core';
import { EmployeeData } from 'src/app/shared/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AdminDataRepoService {
  constructor() {}

  selectedEmpData!: EmployeeData;

  setSelectedEmpData(data: EmployeeData) {
    this.selectedEmpData = data;
  }

  getSelectedEmpData(){
    return this.selectedEmpData;
  }
}
