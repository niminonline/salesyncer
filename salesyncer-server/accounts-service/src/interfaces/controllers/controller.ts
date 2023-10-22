import { Request, Response } from "express";
import { verifyToken } from "../../middlewares/jwt";
import { getAdminToken } from "../../usecases/verifyAdminLogin";
import verifyEmployeeLogin from "../../usecases/verifyEmployeeLogin";
import { publishToChannel } from "../../services/redisOps";
import { Admin } from "mongodb";

interface AdminData {
  email:string,
  password:string
  requestId: string;
  action: string;
  
}


export const adminLogin = async (data:any) => {
  try {
    // console.log("Req body",data);
    const { email, password,requestId,action } = data;
    // console.log("email",email);

    const response:any= await getAdminToken(email, password);

    if(response){

      response.requestId=requestId;
      response.action=action;
    }
  
      // console.log("myresponse",response);
       publishToChannel('adminLogin-res',response);
  
  } catch (error) {
    console.error(error);
  }
};


export const employeeLogin = async (data:any): Promise<void> => {
    try {
      const { email, password ,requestId,action } = data;
      const response:any = await verifyEmployeeLogin(email, password);
      if(response){

        response.requestId=requestId;
        response.action=action;
      }
      publishToChannel('employeeLogin-res',response);
    } catch (err) {
      console.error(err);
    }
  };

