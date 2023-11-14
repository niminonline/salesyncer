import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.state'; 

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectEmployeeData = createSelector(
  selectUserState,
  (state) => state.employeeData
);

