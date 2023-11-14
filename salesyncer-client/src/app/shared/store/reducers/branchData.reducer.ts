import { createReducer,on } from "@ngrx/store";
import * as BranchDataActions from '../actions/branchData.actions'
import { initialState } from "../state/branchData.state";



  export const branchDataReducer = createReducer(
    initialState,
    on(BranchDataActions.storeBranchData, (state, { branchData }) => ({...state,branchData})),
    on(BranchDataActions.retrieveBranchData, (state) => state),
  );
  
  

