import { qAddEmployeeCredentials } from "../database/repositories/authRepo";

const addEmployeeToDb = async (
  empId: string,
  email: string,
  password: string
): Promise<object | undefined> => {
  try {
    if (empId && email && password) {
      const response = await qAddEmployeeCredentials(empId, email, password);
      return response;
    } else {
      return { message: "Missing credentials", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};


export default addEmployeeToDb;