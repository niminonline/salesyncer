import { Component,OnInit,ViewChild,AfterViewInit  } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];



@Component({
  selector: 'app-manage-branch',
  templateUrl: './manage-branch.component.html',
  styleUrls: ['./manage-branch.component.scss'],
})
export class ManageBranchComponent implements OnInit  {




  branchData!:any;
  tableData!:any;
  displayedColumns!:any;
  @ViewChild(TableComponent) branchTable!: TableComponent;
  constructor(private sharedApi: SharedApiService) {}

  ngOnInit() {
    this.sharedApi.getBranches().subscribe((response) => {
      this.branchData = response;
      console.log(this.branchData);
      this.tableData= this.branchData.branchData;

      this.displayedColumns = [
        { name: 'Branch Code', property: 'branchCode', sortable: 'branchCodeSortable' },
        { name: 'Branch Name', property: 'branchName', sortable: 'branchNameSortable'},
        { name: 'Location', property: 'location', sortable: 'locationSortable'},
      ];



      // this.ELEMENT_DATA=  [
      //   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      //   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      //   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      //   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      //   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      //   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      //   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      //   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      //   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      //   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      // ];


      // Now that you have the data, pass it to the child component
      // this.branchTable.tableData = this.branchData;
      // this.branchTable.displayedColumns = [
      //   { name: 'Branch Code', property: 'branchCode', sortable: true },
      //   { name: 'Branch Name', property: 'branchName', sortable: true },
      //   { name: 'Location', property: 'location', sortable: true },
      // ];
    });
  }


    
   
  
}
