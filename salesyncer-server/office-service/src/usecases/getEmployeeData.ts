import { qEmployeeDataById } from "../database/repositories/employeeRepo";
import logger from "../services/winston";

const getEmployeeData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const employeeData = await qEmployeeDataById(_id);
      if (employeeData) {
        return {
          employeeData,
          message: "Employee details fetched successfully",
          status: "OK",
        };
      } else {
        return {
          message: "Employee details fetching failed",
          status: "FAILED",
        };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default getEmployeeData;
