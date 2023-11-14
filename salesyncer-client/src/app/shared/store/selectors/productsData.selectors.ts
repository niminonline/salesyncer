import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsData } from '../../interfaces/interfaces';


export const selectProductsDataState = createFeatureSelector<ProductsData>('productsData');

export const selectProductsData = createSelector(
  selectProductsDataState,
  (state) => state.productsData
);



