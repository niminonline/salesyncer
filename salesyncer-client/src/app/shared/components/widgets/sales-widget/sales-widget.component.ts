import { Component, Input, OnInit } from '@angular/core';
import { Sale } from 'src/app/shared/interfaces/interfaces';
import { Store } from '@ngrx/store';
import * as salesDataActions from '../../../../shared/store/actions/salesData.actions';
import { selectSalesData } from 'src/app/shared/store/selectors/salesData.selectors';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-sales-widget',
  templateUrl: './sales-widget.component.html',
  styleUrls: ['./sales-widget.component.scss'],
})
export class SalesWidgetComponent implements OnInit {
  @Input() role!: string;
  @Input() user!: string;
  salesData!: Sale[];
  selectedEmployeeData: any;
  branchSales: any;
  employeeSales: any;
  productSales: any;
  productsChart!: any;
  employeesChart!: any;
  branchChart!: any;

  constructor(private store: Store) {}

  ngOnInit() {
    this.getSalesData();
  }

  getSalesData() {
    this.store.dispatch(salesDataActions.retrieveSalesData());
    this.store.select(selectSalesData).subscribe((response) => {
      if (this.role !== 'admin') {
        this.salesData = response.filter(
          (sale) => sale.employeeName == this.user
        );
      } else {
        this.salesData = response;
      }
      this.branchSales = {};
      this.employeeSales = {};
      this.productSales = {};
      this.salesData.map((sale) => {
        if (sale.branchName && sale.amount) {
          this.branchSales[sale.branchName] =
            (this.branchSales[sale.branchName] | 0) + sale.amount;
        }
        if (sale.employeeName && sale.amount) {
          this.employeeSales[sale.employeeName] =
            (this.employeeSales[sale.employeeName] | 0) + sale.amount;
        }
        if (sale.productName && sale.amount) {
          this.productSales[sale.productName] =
            (this.productSales[sale.productName] | 0) + 1;
        }
      });

      this.getTopProducts(this.productSales);
      this.getTopBranches(this.branchSales);
      this.getTopEmployees(this.employeeSales);
    });
  }

  getTopProducts(productSales: any) {
    const productSalesArray: any = Object.entries(productSales);
    productSalesArray.sort((a: any, b: any) => b[1] - a[1]);

    if (productSalesArray.length > 5) {
      productSalesArray.splice(5);
    }
    this.productSales = Object.fromEntries(productSalesArray);

    this.productsSalesChart();
  }
  getTopBranches(branchSales: any) {
    const branchSalesArray: any = Object.entries(branchSales);
    branchSalesArray.sort((a: any, b: any) => b[1] - a[1]);

    if (branchSalesArray.length > 5) {
      branchSalesArray.splice(5);
    }
    this.productSales = Object.fromEntries(branchSalesArray);
    this.branchSalesChart();
  }
  getTopEmployees(employeeSales: any) {
    const employeeSalessArray: any = Object.entries(employeeSales);
    employeeSalessArray.sort((a: any, b: any) => b[1] - a[1]);

    if (employeeSalessArray.length > 5) {
      employeeSalessArray.splice(5);
    }
    this.productSales = Object.fromEntries(employeeSalessArray);
    this.employeeSalesChart();
  }

  productsSalesChart() {
    this.productsChart = new Chart('topProductsChart', {
      type: 'line',

      data: {
        labels: Object.keys(this.productSales),
        datasets: [
          {
            label: ' No of units sold',
            data: Object.values(this.productSales),
            backgroundColor: 'rgba(127,255,212)',
            borderColor:'rgba(0,206,209)',
            pointBorderColor: 'rgba(0,206,209)' ,
            fill: true,
            stepped: true,
            pointStyle: 'circle',
            pointRadius: 10,
            borderWidth: 3,
            pointHoverRadius: 15
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        interaction: {
          intersect: false,
          axis: 'x',
        },
      },
    });
  }
  employeeSalesChart() {
    this.employeesChart = new Chart('topEmployeesChart', {
      type: 'line',

      data: {
        labels: Object.keys(this.employeeSales),
        datasets: [
          {
            label: 'Total Sales',
            data: Object.values(this.employeeSales),
            backgroundColor: 'rgba(255,250,205)',
            borderColor:'rgba(218,165,32)',
            pointBorderColor: 'rgba(218,165,32)' ,
            fill: true,
            stepped: true,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
        ],
      },
      options: {
        
        responsive: true,
        aspectRatio: 2.5,
        interaction: {
          intersect: false,
          axis: 'x',
        },
        plugins: {
          title: {
            display: true,
          },
        },
      },
    });
  }
  branchSalesChart() {
    this.branchChart = new Chart('topBranchChart', {
      type: 'line',

      data: {
        labels: Object.keys(this.branchSales),
        datasets: [
          {
            label: 'Total Sales',
            data: Object.values(this.branchSales),
            backgroundColor: 'rgba(221,160,221)',
            borderColor:'rgba(238,130,238)',
            pointBorderColor: 'rgba(238,130,238)' ,
            fill: true,
            stepped: true,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        interaction: {
          intersect: false,
          axis: 'x',
        },
      },
    });
  }
}
