import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivitiesData } from '../../interfaces/interfaces';


export const selectActivitiesDataState = createFeatureSelector<ActivitiesData>('activitiesData');

export const selectActivitiesData = createSelector(
  selectActivitiesDataState,
  (state) => state.activitiesData
);



