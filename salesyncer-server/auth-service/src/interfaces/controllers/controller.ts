import { getAdminToken } from "../../usecases/verifyAdminLogin";
import verifyEmployeeLogin from "../../usecases/verifyEmployeeLogin";
import { publishToChannel } from "../../services/redisOps";
import tokenVerification from "../../usecases/verifyJwtToken";
import addEmployeeToDb from "../../usecases/addEmployeeToDb";

interface AdminData {
  email: string;
  password: string;
  requestId: string;
  action: string;
}

export const adminLogin = async (data: any) => {
  try {
    // console.log("Req body", data);
    const { email, password, requestId, action } = data;
    // console.log("email", email);

    const response: any = await getAdminToken(email, password);

    if (response) {
      response.requestId = requestId;
      response.action = action;
    }

    // console.log("myresponse", response);
    publishToChannel("ApiRes-adminLogin", response);
  } catch (error) {
    console.error(error);
  }
};

export const employeeLogin = async (reqData: any): Promise<void> => {
  try {
    const { email, password, requestId, action } = reqData;
    console.log("INPut data from auth service ", reqData);
    const response: any = await verifyEmployeeLogin(email, password);
    console.log("Output data from auth ", response);
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
    console.error(err);
  }
};

export const verifyToken = async (data: any): Promise<void> => {
  try {
    // console.log("Input from verfitoken Auth", data);
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
    console.error(err);
  }
};
export const addEmployeeToAuthDb = async (data: any): Promise<void> => {
  try {
    // console.log("Input from addEmployeeToAuthDb Auth", data);
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
    console.error(err);
  }
};
