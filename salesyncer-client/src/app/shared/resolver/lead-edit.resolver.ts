import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';

@Injectable({
  providedIn: 'root',
})
export class LeadsEditResolver implements Resolve<any> {
  constructor(private sharedAPI: SharedApiService) {}

  resolve() {
    return forkJoin([
      this.sharedAPI.getLeadSource(),
      this.sharedAPI.getProductCategories(),
      this.sharedAPI.getBranches(),
      this.sharedAPI.getEmployeesData(),
      this.sharedAPI.getLeads(),
      this.sharedAPI.getProducts(),


    ]).pipe(
      map((results) => {
        return {
          leadSourceData: results[0],
          productCategoriesData: results[1],
          branchData: results[2],
          employeesData: results[3],
          leadsData:results[4],
          productsData:results[5],
        };
      })
    );
  }
}
