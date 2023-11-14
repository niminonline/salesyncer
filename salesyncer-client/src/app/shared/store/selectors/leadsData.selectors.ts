import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeadsData } from '../../interfaces/interfaces';


export const selectLeadsDataState = createFeatureSelector<LeadsData>('leadsData');

export const selectLeadsData = createSelector(
  selectLeadsDataState,
  (state) => state.leadsData
);



