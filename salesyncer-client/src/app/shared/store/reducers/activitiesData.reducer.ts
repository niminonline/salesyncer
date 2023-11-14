import { createReducer,on } from "@ngrx/store";
import * as ActivitiesDataActions from '../actions/activitiesData.actions'
import { initialState } from "../state/activitiesData.state";



  export const activitiesDataReducer = createReducer(
    initialState,
    on(ActivitiesDataActions.storeActivitiesData, (state, { activitiesData }) => ({...state,activitiesData})),
    on(ActivitiesDataActions.retrieveActivitiesData, (state) => state),
  );
  
  

