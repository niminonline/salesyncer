import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalesData } from '../../interfaces/interfaces';


export const selectSalesDataState = createFeatureSelector<SalesData>('salesData');

export const selectSalesData = createSelector(
  selectSalesDataState,
  (state) => state.salesData
);



