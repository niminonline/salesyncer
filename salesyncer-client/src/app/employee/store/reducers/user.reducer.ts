import { createReducer,on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions'
import { initialState } from "../state/user.state";



  export const userReducer = createReducer(
    initialState,
    on(UserActions.storeEmployeeData, (state, { employeeData }) => ({...state,employeeData})),
    on(UserActions.retrieveEmployeeData, (state) => state),
    on(UserActions.clearEmployeeData, (state) => initialState) 
  );
  
  
