import getEmployeeData from "../../usecases/getEmployeeData";
import addEmployeeData from "../../usecases/addEmployeeData";
import { publishToChannel } from "../../services/redisOps";
import getBranchData from "../../usecases/getBranchData";
import addBranchData from "../../usecases/addBranchData";
import getEmployeesData from "../../usecases/getEmployeesData";
import updateEmployeeData from "../../usecases/updateEmployeeData";
import { qEmployeeDataByEmail,qEmployeeDataById } from "../../database/repositories/employeeRepo";
import getLeaveCategoryData from "../../usecases/getLeaveCategoryData";
import applyLeaveData from "../../usecases/applyLeaveData";
import fetchLeaveData from "../../usecases/fetchLeaveData";
import getLeaveRequestsData from "../../usecases/getLeaveRequestsData";
import leaveAction from "../../usecases/leaveAction";
import cancelLeaveData from "../../usecases/cancelLeaveData";
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
export const updateEmployeeDetails = async (data: any) => {
  try {
    
    console.log("Data got from auth to update employee",data)
    const { requestId, action,newEmpData } = data;
    const _id= newEmpData._id;
    // console.log("Request id, action from office controller", requestId, action,newEmpData);
    
    const response: any = await updateEmployeeData(newEmpData);
    if (response.status == "OK") {
      const data = {
        employeesData:response.employeesData,
        requestId,
        action,
        status: "OK",
        message: "Employees data updated successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-updateEmployeeDetails", data);
    } else {
      publishToChannel("ApiRes-updateEmployeeDetails", {
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



export const getLeaveCategoryDetails = async (data:any) => {
  try {
    const{requestId,action}= data;
    const response: any = await getLeaveCategoryData();
    if (response.status == "OK") {
      const data = {
        leaveCategory:response.categoryData,
        requestId,
        action,
        status: "OK",
        message: "Leave categories fetched successfully",
      };
      // console.log("myresponse", data);
      publishToChannel("ApiRes-getLeaveCategoryDetails", data);
    } else {
      publishToChannel("ApiRes-getLeaveCategoryDetails", {
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
export const applyLeaveDetails = async (data: any) => {
  try {
    console.log("Req body of addEmployeeData Controller", data);
    const { requestId, action } = data;
    const response: any = await applyLeaveData(data);
    console.log("Request id, action from office controller",response);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Leave added successfully",
      };
      // console.log("myresponse", data);
      publishToChannel("ApiRes-applyLeaveDetails", data);
    } else {
      publishToChannel("ApiRes-applyLeaveDetails", {
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

export const fetchLeaveDetails = async (data:any) => {
    try {
      const{requestId,action}= data;
      const response: any = await fetchLeaveData(data);
      if (response.status == "OK") {
        const data = {
          leavesData:response.leavesData,
          requestId,
          action,
          status: "OK",
          message: "Leave Data fetched successfully",
        };
        // console.log("myresponse", data);
        publishToChannel("ApiRes-fetchLeaveDetails", data);
      } else {
        publishToChannel("ApiRes-fetchLeaveDetails", {
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
  export const getLeaveRequests = async (data:any) => {
    try {
      const{requestId,action}= data;
      const response: any = await getLeaveRequestsData();
      if (response.status == "OK") {
        const data = {
          leaveRequests:response.leaveRequestsData,
          requestId,
          action,
          status: "OK",
          message: "Leave requests fetched successfully",
        };
        // console.log("myresponse", data);
        publishToChannel("ApiRes-getLeaveRequests", data);
      } else {
        publishToChannel("ApiRes-getLeaveRequests", {
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
    export const doLeaveAction = async (data: any) => {
      try {
        console.log("Req body of leave action", data);
        const { requestId, action } = data;
        const response: any = await leaveAction(data);
        console.log("Request id, action from leave action controller",response);
        if (response.status == "OK") {
          const data = {
            requestId,
            action,
            ...response
          };
          // console.log("myresponse", data);
          publishToChannel("ApiRes-doLeaveAction", data);
        } else {
          publishToChannel("ApiRes-doLeaveAction", {
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
    export const cancelLeaveDetails = async (data: any) => {
      try {
        // console.log("Req body of leave action", data);
        const { requestId, action,_id } = data;
        const response: any = await cancelLeaveData(_id);
        // console.log("Request id, action from cancel leave action controller",response);
        if (response.status == "OK") {
          const data = {
            requestId,
            action,
            ...response
          };
          // console.log("myresponse", data);
          publishToChannel("ApiRes-cancelLeaveDetails", data);
        } else {
          publishToChannel("ApiRes-cancelLeaveDetails", {
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