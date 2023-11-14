import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeesData } from '../../interfaces/interfaces';


export const selectEmployeesDataState = createFeatureSelector<EmployeesData>('employeesData');

export const selectEmployeesData = createSelector(
  selectEmployeesDataState,
  (state) => state.employeesData
);



