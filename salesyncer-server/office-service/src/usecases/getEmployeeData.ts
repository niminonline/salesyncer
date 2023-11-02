import { qEmployeeDataById } from "../database/repositories/employeeRepo";

const getEmployeeData = async (
  _id: string,
 
): Promise<object | undefined> => {
  try {
    if (_id) {
      const employeeData = await qEmployeeDataById(_id);
      // console.log("Employee data from Q", employeeData);
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
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};

export default getEmployeeData
