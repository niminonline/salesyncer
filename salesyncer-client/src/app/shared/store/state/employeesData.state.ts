import { Employee, EmployeesData } from 'src/app/shared/interfaces/interfaces';

export interface EmployeesDataState {
  employeesData: Employee[] | [];
}

export const initialState: EmployeesData = {
  employeesData: [],
};
