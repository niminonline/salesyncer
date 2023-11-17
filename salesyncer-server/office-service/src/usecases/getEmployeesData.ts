import { qEmployeesData } from "../database/repositories/employeeRepo";
import logger from "../services/winston";

const getEmployeesData = async (): Promise<object | undefined> => {
  try {
    const employeesData = await qEmployeesData();
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
    logger.error(err);
  }
};
export default getEmployeesData;
