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
    console.log("Req body",data);
    const { email, password,requestId,action } = data;
    console.log("email",email);

    const adminData:any= await getAdminToken(email, password);

    if(adminData){

      adminData.requestId=requestId;
      adminData.action=action;
    }
  
      console.log("myresponse",adminData);
      // Publish the response
       publishToChannel('auth-response',adminData);
  
  } catch (error) {
    console.error(error);
  }
};


export const employeeLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      // console.log("login-",req.body)
      const { email, password } = req.body;
      const response = await verifyEmployeeLogin(email, password);
      res.json(response);
    } catch (err) {
      console.error(err);
    }
  };
// export const saveEmpCredentials = async (req: Request, res: Response): Promise<void> => {
//     try {
//       // console.log("login-",req.body)
//       const { empId, email, password } = req.body;
//       const response = await saveEmpCredentialData(empId,email, password);
//       res.json(response);
//     } catch (err) {
//       console.error(err);
//     }
//   };

