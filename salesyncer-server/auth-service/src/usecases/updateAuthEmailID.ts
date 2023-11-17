import { qUpdateAuthEmail } from "../database/repositories/authRepo";
import logger from "../services/winston";

const updateAuthEmailID = async (
  empId: string,
  email: string,
): Promise<object | undefined> => {
  try {



    if (empId && email ) {
      const response = await qUpdateAuthEmail(empId, email);
      if(response)
      return response;
    } else {
      return { message: "Missing credentials", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};


export default updateAuthEmailID;