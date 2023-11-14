import { EmployeeType } from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeEmployeeData = createAction('[employeeData] Store User Data', props<{ employeeData: EmployeeType }>());

export const retrieveEmployeeData = createAction('[employeeData] Retrieve User Data');

export const clearEmployeeData = createAction('[employeeData] Clear User Data');
