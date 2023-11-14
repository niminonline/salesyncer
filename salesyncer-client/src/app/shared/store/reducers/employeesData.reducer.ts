import { createReducer,on } from "@ngrx/store";
import * as EmployeesDataActions from '../actions/employeesData.actions'
import { initialState } from "../state/employeesData.state";



  export const employeesDataReducer = createReducer(
    initialState,
    on(EmployeesDataActions.storeEmployeesData, (state, { employeesData }) => ({...state,employeesData})),
    on(EmployeesDataActions.retrieveEmployeesData, (state) => state),
  );
  
  

