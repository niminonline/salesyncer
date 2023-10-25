import { qEmployeesData } from "../database/repositories/employeeRepo";

const getEmployeesData = async (): Promise<object | undefined> => {
  try {
         const employeesData = await qEmployeesData();
      console.log("Employee data from Q", employeesData);
      if (employeesData) {
      
        return {
            employeesData,
          message: "Employees data fetched successfully",
          status: "OK",
        };
      } else {
        return { message: "Employees data fetching failed", status: "FAILED" };
      }
    
  } catch (err) {
    console.error(err);
  }

}
export default getEmployeesData;
