import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductCategoriesData } from '../../interfaces/interfaces';


export const selectProductCategoriesDataState = createFeatureSelector<ProductCategoriesData>('productCategoriesData');

export const selectProductCategoriesData = createSelector(
  selectProductCategoriesDataState,
  (state) => state.productCategoriesData
);



