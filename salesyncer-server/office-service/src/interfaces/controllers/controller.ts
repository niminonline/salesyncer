import getEmployeeData from "../../usecases/getEmployeeData";
import addEmployeeData from "../../usecases/addEmployeeData";
import { publishToChannel } from "../../services/redisOps";
import getBranchData from "../../usecases/getBranchData";
import addBranchData from "../../usecases/addBranchData";
import getEmployeesData from "../../usecases/getEmployeesData";
import { qEmployeeDataByEmail,qEmployeeDataById } from "../../database/repositories/employeeRepo";

interface AdminData {
  email: string;
  password: string;
  requestId: string;
  action: string;
}

export const getEmployeeDetails = async (data: any) => {
  try {
    // console.log("Req body of getEmployeeDetails Controller", data);
    const { _id, requestId, action } = data;
    // console.log("email of getEmployeeDetails Controller", email);

    const response: any = await getEmployeeData(_id);

    if (response) {
      response.requestId = requestId;
      response.action = action;
    }

    // console.log("myresponse", response);
    publishToChannel("ApiRes-getEmployeeData", response);
  } catch (error) {
    console.error(error);
  }
};
export const addEmployeeDetails = async (data: any) => {
  try {
    // console.log("Req body of addEmployeeData Controller", data);
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await addEmployeeData(data);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Employee added successfully",
      };
      // console.log("myresponse", data);
      publishToChannel("ApiRes-addEmployeeData", data);
    } else {
      publishToChannel("ApiRes-addEmployeeData", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
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
      // console.log("myresponse", data);
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

export const addBranchDetails = async (data: any) => {
  try {
    // console.log("Req body of addBranchDetails Controller", data);
    const { requestId, action} = data;
    const response: any = await addBranchData(data);
    // console.log("All branch data",response);
    
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Branch added successfully",
        branchData:response
      };
      // console.log("myresponse", data);
      publishToChannel("ApiRes-addBranchDetails", data);
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
export const getEmployeesDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getEmployeesData();
    if (response.status == "OK") {
      const data = {
        employeesData:response.employeesData,
        requestId,
        action,
        status: "OK",
        message: "Employees data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getEmployeesDetails", data);
    } else {
      publishToChannel("ApiRes-getEmployeesDetails", {
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
export const getEmployeeDataWithEmail = async (data: any) => {
  try {
    const { requestId, action,email } = data;
    // console.log("Request id, action from office controller", requestId, action,email);
    const response: any = await qEmployeeDataByEmail(email);
    if (response) {
      const data = {
        _id:response._id,
        requestId,
        action,
        status: "OK",
        message: "Employees data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("Res-getEmployeeDataWithEmail", data);
    } else {
      publishToChannel("Res-getEmployeeDataWithEmail", {
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