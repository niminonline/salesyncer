import { qEmployeeDataByEmail } from "../database/repositories/qEmployeeDataByEmail";

const getEmployeeData = async (
  email: string,
 
): Promise<object | undefined> => {
  try {
    if (email) {
      const employeeData = await qEmployeeDataByEmail(email);
      console.log("Employee data from Q", employeeData);
      if (employeeData) {
      
        return {
          employeeData,
          message: "Employee details fetched successfully",
          status: "OK",
        };
      } else {
        return { message: "Employee details fetching failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing Email", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};

export default getEmployeeData
