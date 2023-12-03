import { getAdminToken } from "../../usecases/verifyAdminLogin";
import verifyEmployeeLogin from "../../usecases/verifyEmployeeLogin";
import { publishToChannel } from "../../services/redisOps";
import tokenVerification from "../../usecases/verifyJwtToken";
import addEmployeeToDb from "../../usecases/addEmployeeToDb";
import updateAuthEmailID from "../../usecases/updateAuthEmailID";
import logger from "../../services/winston";
import updatePassword from "../../usecases/updatePassword";

interface AdminData {
  email: string;
  password: string;
  requestId: string;
  action: string;
}

export const adminLogin = async (data: any) => {
  try {
    const { email, password, requestId, action } = data;

    const response: any = await getAdminToken(email, password);

    if (response) {
      response.requestId = requestId;
      response.action = action;
    }

    publishToChannel("ApiRes-adminLogin", response);
  } catch (error) {
    logger.error(error);
  }
};

export const employeeLogin = async (reqData: any): Promise<void> => {
  try {
    const { email, password, requestId, action } = reqData;
    const response: any = await verifyEmployeeLogin(email, password);
    if (response) {
      if (response.status == "OK") {
        const resData: any = {
          email,
          requestId,
          _id:response._id,
          token: response.token,
          status: response.status,
          message: response.message,
        };
        publishToChannel("ApiRes-employeeLogin", resData);
      } else {
        response.requestId = requestId;
        response.action = action;
        publishToChannel("ApiRes-employeeLogin", response);
      }
    } else {
      const resData: any = {
        status: "FAILED",
        message: "Cannot verify user",
        action,
      };
      publishToChannel("ApiRes-employeeLogin", resData);
    }
  } catch (err) {
    logger.error(err);
  }
};

export const verifyToken = async (data: any): Promise<void> => {
  try {
    const { requestId, action } = data;
    const response: any = await tokenVerification(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;

      publishToChannel("ApiRes-verifyToken", response);
    } else {
      const response: any = { status: "FAILED", message: "Cannot verify user" };
      publishToChannel("ApiRes-verifyToken", response);
    }
  } catch (err) {
    logger.error(err);
  }
};


export const addEmployeeToAuthDb = async (data: any): Promise<void> => {
  try {
    const { requestId, action,empId,email,password } = data;
   
    const response: any = await addEmployeeToDb(empId,email,password);

    if (response) {
      const data= {status:"OK", message:"Employee added to auth DB",requestId,action}
     

      publishToChannel("Res-addEmployeeToAuthDb", data);
    } else {
      const response: any = { status: "FAILED", message: "Cannot verify user" };
      publishToChannel("Res-addEmployeeToAuthDb", response);
    }
  } catch (err) {
    logger.error(err);
  }
};

export const updateAuthEmail = async (data: any): Promise<void> => {
  try {
    const { requestId, action,empId,email } = data;
   
    const response: any = await updateAuthEmailID(empId,email);

    if (response) {
      const data= {status:"OK", message:"Employee email updated in auth DB",requestId,action}
     

      publishToChannel("Res-updateAuthEmail", data);
    } else {
      const response: any = { status: "FAILED", message: "Employee email updation failed" };
      publishToChannel("Res-updateAuthEmail", response);
    }
  } catch (err) {
    logger.error(err);
  }
};


export const passwordUpdate = async (data: any) => {
  try {
    const { email, currentPassword,newPassword, requestId, action } = data;

    const response: any = await updatePassword(email,currentPassword, newPassword);

    if (response) {
      response.requestId = requestId;
      response.action = action;
    }

    publishToChannel("ApiRes-passwordUpdate", response);
  } catch (error) {
    logger.error(error);
  }
};
