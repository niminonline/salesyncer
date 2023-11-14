import { createReducer,on } from "@ngrx/store";
import * as LeadSourceDataActions from '../actions/leadSourceData.actions'
import { initialState } from "../state/branchData.state";



  export const leadSourceDataReducer = createReducer(
    initialState,
    on(LeadSourceDataActions.storeLeadSourceData, (state, { leadSourceData }) => ({...state,leadSourceData})),
    on(LeadSourceDataActions.retrieveLeadSourceData, (state) => state),
  );
  
  

