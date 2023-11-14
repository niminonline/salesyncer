import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProductCategoriesDataActions from '../actions/productCategoriesData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { ProductCategoriesData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class ProductCategoriesDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultProductCategoriesData: ProductCategoriesData = {
    productCategoriesData: [],
    status: '',
    message: '',
  };

  retrieveProductCategoriesDataData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductCategoriesDataActions.retrieveProductCategoriesData),
      switchMap(() => {
        return this.sharedApi.getProductCategories().pipe(
          tap((response) => {
            // console.log('API Response:', response);
          }),
          map((response) =>
            ProductCategoriesDataActions.storeProductCategoriesData({
              productCategoriesData: response.productCategoriesData || this.defaultProductCategoriesData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
