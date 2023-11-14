import {Employee} from "src/app/shared/interfaces/interfaces";
import { createAction,props } from "@ngrx/store";


export const storeEmployeesData = createAction('[employeesData] Store Employees Data', props<{ employeesData: Array<Employee> }>());

export const retrieveEmployeesData = createAction('[employeesData] Retrieve Employees Data');


