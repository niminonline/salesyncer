import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminDataRepoService {
  constructor() {}

  selectedEmpData!: any;

  setSelectedEmpData(data: any) {
    this.selectedEmpData = data;
  }

  getSelectedEmpData(){
    return this.selectedEmpData;
  }
}
