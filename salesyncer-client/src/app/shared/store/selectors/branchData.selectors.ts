import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Branch, BranchData } from '../../interfaces/interfaces';


export const selectBranchDataState = createFeatureSelector<BranchData>('branchData');

export const selectBranchData = createSelector(
  selectBranchDataState,
  (state) => state.branchData
);



