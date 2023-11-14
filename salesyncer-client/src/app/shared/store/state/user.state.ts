import { Employee } from "src/app/shared/interfaces/interfaces";

export interface UserState {
    employeeData: Employee | null;
  }

  export const initialState: UserState = {
    employeeData: null,
  };