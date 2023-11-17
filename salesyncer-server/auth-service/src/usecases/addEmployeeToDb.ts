import { qAddEmployeeCredentials } from "../database/repositories/authRepo";
import { securePassword } from "../services/bcrypt";
import logger from "../services/winston";

const addEmployeeToDb = async (
  empId: string,
  email: string,
  password: string
): Promise<object | undefined> => {
  try {

    const sPassword:any= await securePassword(password);


    if (empId && email && password) {
      const response = await qAddEmployeeCredentials(empId, email, sPassword);
      return response;
    } else {
      return { message: "Missing credentials", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};


export default addEmployeeToDb;