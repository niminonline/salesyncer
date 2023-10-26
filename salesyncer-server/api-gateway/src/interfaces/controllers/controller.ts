import { Request, Response } from "express";
import {
  publishAdminLogin,
  publishEmployeeLogin,
  verifyToken,
} from "../../usecases/auth";
import {
  getEmployeeData,
  addEmployeeData,
  getBranchDetails,
  addBranchDetails,
  getEmployeesDetails,
  updateEmployeeDetails,
  getLeaveCategoryDetails,
  applyLeaveDetails,
  fetchLeaveDetails,
  getLeaveRequests,
  doLeaveAction

} from "../../usecases/office";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response: any = await publishAdminLogin(data);

    delete response.requestId;
    delete response.action;
    res.json(response);
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const employeeLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response:any = await publishEmployeeLogin(data);

    delete response.requestId;
    delete response.action;

    res.json(response);
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getEmployeeDetails = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    console.log("id & Headers in api", _id, headers);
    // const data ={headers,email}
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getEmployeeData({ _id });

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addEmployee = async (req: Request, res: Response) => {
  try {
   
    const headers = req.headers;
    const employeeData = req.body;
    // console.log("email & Headers in api", employeeData, headers);
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await addEmployeeData(employeeData);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBranches = async (req: Request, res: Response) => {
  
  
  try{
  const headers = req.headers;
  const response: any = await verifyToken(headers);
  if (response.status == "OK") {
    const response: any = await getBranchDetails();
    
    delete response.requestId;
    delete response.action;
    res.json(response);
  } else {
    res.json(response);
  } 
}catch (error) {
  console.error("Error in /auth:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
};

export const addBranch = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response: any = await addBranchDetails(data);
    
    delete response.requestId;
    delete response.action;
    res.json(response);
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEmployeesData = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getEmployeesDetails();
      
      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      
      const data:any={};
      data.newEmpData=req.body;
      const response: any = await updateEmployeeDetails(data);
      
      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLeaveCategory = async (req: Request, res: Response) => {
  
  try{
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getLeaveCategoryDetails();
      
      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    } 
  }catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const applyLeave = async (req: Request, res: Response) => {
  try {
    
    const headers = req.headers;
    const leaveData = req.body;
    // console.log("email & Headers in api", employeeData, headers);
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await applyLeaveDetails(leaveData);
      
      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const fetchLeaveData = async (req: Request, res: Response) => {
  
    try{
      const headers = req.headers;
      const data = req.body;
      const response: any = await verifyToken(headers);
      if (response.status == "OK") {
        const response: any = await fetchLeaveDetails(data);
        
        delete response.requestId;
        delete response.action;
        res.json(response);
      } else {
        res.json(response);
      } 
    }catch (error) {
      console.error("Error in /auth:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  export const leaveRequests = async (req: Request, res: Response) => {
    
    try{
      const headers = req.headers;
      const response: any = await verifyToken(headers);
      if (response.status == "OK") {
        const response: any = await getLeaveRequests();
        
        delete response.requestId;
        delete response.action;
        res.json(response);
      } else {
        res.json(response);
      } 
    }catch (error) {
      console.error("Error in /auth:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  export const leaveAction = async (req: Request, res: Response) => {
    try {
      
      const headers = req.headers;
      const data = req.body;
      console.log("email & Headers in api", data, headers);
      const response: any = await verifyToken(headers);
      if (response.status == "OK") {
        const response: any = await doLeaveAction(data);
        
        delete response.requestId;
        delete response.action;
        res.json(response);
      } else {
        res.json(response);
      }
    } catch (error) {
      console.error("Error in /auth:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };