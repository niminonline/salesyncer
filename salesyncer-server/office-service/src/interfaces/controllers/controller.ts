import { Request, Response } from "express";
import getEmployeeData from "../../usecases/getEmployeeData";
import { publishToChannel } from "../../services/redisOps";

interface AdminData {
  email:string,
  password:string
  requestId: string;
  action: string;
  
}


export const getEmployeeDetails = async (data:any) => {
  try {
    console.log("Req body of getEmployeeDetails Controller",data);
    const { email,requestId,action,token } = data;
    console.log("email of getEmployeeDetails Controller",email);

    const response:any= await getEmployeeData(email);

    if(response){

      response.requestId=requestId;
      response.action=action;
    }
  
      console.log("myresponse",response);
       publishToChannel('ApiRes-getEmployeeData',response);
  
  } catch (error) {
    console.error(error);
  }
};



