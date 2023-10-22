import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() displayedColumns: any;
  @Input() tableData!: any;

  dataSource= new MatTableDataSource(this.tableData);
  filterValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['displayedColumns']) {
     this.displayedColumns=  changes['displayedColumns'].currentValue; ;
    }
    if (changes['tableData']) {
      this.dataSource.data = this.tableData; 
    }
  }
  getHeaderRowDef(): string[] {
    return this.displayedColumns.map((column: any) => column.property);
  }

  getRowDef(): string[] {
    return this.displayedColumns.map((column: any) => column.property);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPageChange(event: any) {
    // Assuming event.pageIndex and event.pageSize are available in the event object
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    // Calculate the new data slice based on the page index and page size
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    // Update the data source with the new slice of data
    const slicedData = this.tableData.slice(startIndex, endIndex);
    this.dataSource.data = slicedData;
  }
}
