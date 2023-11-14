import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeadSourceData } from '../../interfaces/interfaces';


export const selectLeadSourceDataState = createFeatureSelector<LeadSourceData>('leadSourceData');

export const selectLeadSourceData = createSelector(
  selectLeadSourceDataState,
  (state) => state.leadSourceData
);



