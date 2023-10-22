import { Component,OnInit,ViewChild,AfterViewInit  } from '@angular/core';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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

       });
  }


    
   
  
}
