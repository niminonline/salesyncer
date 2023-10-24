import { EmployeeType } from "src/app/shared/interfaces/interfaces";

export interface UserState {
    employeeData: EmployeeType | null;
  }

  export const initialState: UserState = {
    employeeData: null,
  };