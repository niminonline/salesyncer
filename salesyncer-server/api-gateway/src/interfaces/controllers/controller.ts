import { Request, Response } from "express";
import {
  publishAdminLogin,
  publishEmployeeLogin,
  verifyToken,
} from "../../usecases/auth";
import { getEmployeeData, addEmployeeData,getBranchDetails,addBranchDetails } from "../../usecases/office";

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
    const response = await publishEmployeeLogin(data);

    res.json(response);
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getEmployeeDetails = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { email } = req.query;
    console.log("email & Headers in api", email, headers);
    // const data ={headers,email}
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response = await getEmployeeData({ email });
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
    console.log("email & Headers in api", employeeData, headers);
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response = await addEmployeeData(employeeData);
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
  try {
   
    const response: any = await getBranchDetails();

    delete response.requestId;
    delete response.action;
    res.json(response);
   
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const addBranch = async (req: Request, res: Response) => {
  try {
    const data= req.body;
    const response: any = await addBranchDetails(data);

    delete response.requestId;
    delete response.action;
    res.json(response);
   
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
