import { generateAdminToken } from "../middlewares/jwt";
import { qAdminData } from "../database/repositories/authRepo";

export const getAdminToken = async (
  email: string,
  password: string
): Promise<object | undefined> => {
  try {
    if (email && password ) {
      const adminData = await qAdminData(email);
      console.log("AdminData", adminData);
      if (adminData?.password === password) {
        const adminToken = generateAdminToken(adminData);
        return {
          adminData,
          adminToken,
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
    console.error(err);
  }
};
