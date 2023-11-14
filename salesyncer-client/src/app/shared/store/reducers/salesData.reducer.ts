import { createReducer,on } from "@ngrx/store";
import * as SalesDataActions from '../actions/salesData.actions'
import { initialState } from "../state/salesData.state";



  export const salesDataReducer = createReducer(
    initialState,
    on(SalesDataActions.storeSalesData, (state, { salesData }) => ({...state,salesData})),
    on(SalesDataActions.retrieveSalesData, (state) => state),
  );
  
  

