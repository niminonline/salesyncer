import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as ProductsDataActions from '../actions/productsData.actions';
import { SharedApiService } from 'src/app/shared/services/shared-api.service';
import { ProductsData } from 'src/app/shared/interfaces/interfaces';

@Injectable()
export class ProductsDataEffects {
  constructor(
    private actions$: Actions,
    private sharedApi: SharedApiService,
  ) {}

  private defaultProductsData: ProductsData = {
    productsData: [],
    status: '',
    message: '',
  };

  retrieveProductsData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsDataActions.retrieveProductsData),
      switchMap(() => {
        return this.sharedApi.getProducts().pipe(
          tap((response) => {
            // console.log('API Response:', response);
          }),
          map((response) =>
            ProductsDataActions.storeProductsData({
              productsData: response.productsData || this.defaultProductsData,
            })
          ),
          catchError(() => of({ type: 'error' }))
        );
      })
    )
  );
}
