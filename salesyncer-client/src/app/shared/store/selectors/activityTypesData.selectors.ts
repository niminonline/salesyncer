import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityTypesData } from '../../interfaces/interfaces';


export const selectActivityTypesDataState = createFeatureSelector<ActivityTypesData>('activityTypesData');

export const selectActivityTypesData = createSelector(
  selectActivityTypesDataState,
  (state) => state.activityTypesData
);



