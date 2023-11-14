import { createReducer,on } from "@ngrx/store";
import * as ActivityTypesDataActions from '../actions/activityTypesData.actions'
import { initialState } from "../state/activityTypesData.state";



  export const activityTypesDataReducer = createReducer(
    initialState,
    on(ActivityTypesDataActions.storeActivityTypesData, (state, { activityTypesData }) => ({...state,activityTypesData})),
    on(ActivityTypesDataActions.retrieveActivityTypesData, (state) => state),
  );
  
  

