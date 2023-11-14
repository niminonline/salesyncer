import { createReducer,on } from "@ngrx/store";
import * as LeadsDataActions from '../actions/leadsData.actions'
import { initialState } from "../state/leadsData.state";



  export const leadsDataReducer = createReducer(
    initialState,
    on(LeadsDataActions.storeLeadsData, (state, { leadsData }) => ({...state,leadsData})),
    on(LeadsDataActions.retrieveLeadsData, (state) => state),
  );
  
  

