import { generateAdminToken } from "../middlewares/jwt";
import { qAdminData } from "../database/repositories/authRepo";
import logger from "../services/winston";

export const getAdminToken = async (
  email: string,
  password: string
): Promise<object | undefined> => {
  try {
    if (email && password ) {
      const adminData = await qAdminData(email);
      if (adminData?.password === password) {
        const adminToken = generateAdminToken(adminData);
        return {
          adminEmail:adminData.email,
          token:adminToken,
          message: "Admin credentials verified successfully",
          status: "OK",
        };
      } else {
        return { message: "Invalid credentials", status: "FAILED" };
      }
    } else {
      return { message: "Missing credentials", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};
