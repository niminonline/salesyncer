import { Request, Response } from "express";
import getEmployeeData from "../../usecases/getEmployeeData";
import addEmployeeData from "../../usecases/addEmployeeData";
import { publishToChannel } from "../../services/redisOps";
import getBranchData from "../../usecases/getBranchData";

interface AdminData {
  email: string;
  password: string;
  requestId: string;
  action: string;
}

export const getEmployeeDetails = async (data: any) => {
  try {
    console.log("Req body of getEmployeeDetails Controller", data);
    const { email, requestId, action } = data;
    console.log("email of getEmployeeDetails Controller", email);

    const response: any = await getEmployeeData(email);

    if (response) {
      response.requestId = requestId;
      response.action = action;
    }

    console.log("myresponse", response);
    publishToChannel("ApiRes-getEmployeeData", response);
  } catch (error) {
    console.error(error);
  }
};
export const addEmployeeDetails = async (data: any) => {
  try {
    console.log("Req body of addEmployeeData Controller", data);
    const { requestId, action } = data;
    console.log("Request id, action from office controller", requestId, action);
    const response: any = await addEmployeeData(data);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Employee added successfully",
      };
      console.log("myresponse", data);
      publishToChannel("ApiRes-addEmployeeData", data);
    } else {
      publishToChannel("ApiRes-addEmployeeData", {
        requestId,
        action,
        status: "FAILED",
        message: "No response ",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getBranchDetails = async (data:any) => {
  try {
    const{requestId,action}= data;
    const response: any = await getBranchData();
    if (response.status == "OK") {
      const data = {
        branchData:response.branchData,
        requestId,
        action,
        status: "OK",
        message: "Branches fetched successfully",
      };
      console.log("myresponse", data);
      publishToChannel("ApiRes-getBranchDetails", data);
    } else {
      publishToChannel("ApiRes-getBranchDetails", {
        requestId,
        action,
        status: "FAILED",
        message: "No response ",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
