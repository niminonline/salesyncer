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
  doLeaveAction,
} from "../../usecases/office";
import {
  
  createContactDetails,
  createLeadDetails,
  deleteContactDetails,
  deleteLeadDetails,
  editContactDetails,
  editLeadDetails,
  getContactDetails,
  getContactsDetails,
  getLeadDetails,
  getLeadsDetails,
  getProductCategoryDetails,
  getProductsDetails,
  getLeadSourceDetails,
} from "../../usecases/business";

//=============================Login Controllers===================================
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
    const response: any = await publishEmployeeLogin(data);

    delete response.requestId;
    delete response.action;

    res.json(response);
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//===================================End Login Controllers===============================

//====================================Employee Controllers===============================

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
      const data: any = {};
      data.newEmpData = req.body;
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

//==============================================End Employee Controllers=======================

//==============================================Branch Controllers=======================

export const getBranches = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
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

//==============================================End Branch Controllers=======================

//==============================================Lead SOurce=================================

export const getLeadSource = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getLeadSourceDetails();

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


//==============================================End Lead SOurce=================================



//==============================================Products=================================

export const getProductCategory = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getProductCategoryDetails();

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



export const getProducts = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getProductsDetails();

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





//==============================================End Products=================================



//==============================================Leave Controllers=============================

export const getLeaveCategory = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
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
  try {
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
  } catch (error) {
    console.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const leaveRequests = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
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

//======================================End Leave Controllers=============================

//====================================Contact Controllers===============================
export const createContact = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    console.log("create Contact data,header", data, headers);
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createContactDetails(data);

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
export const editContact = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    console.log("create Contact data,header", data, headers);
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editContactDetails(data);

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
export const getContact = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getContactDetails(data);

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
export const getContacts = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getContactsDetails();

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

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteContactDetails(data);

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

//=============================End Contact controllers================================

//====================================Lead Controllers===============================
export const createLead = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    console.log("create lead data,header", data, headers);
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createLeadDetails(data);

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
export const editLead = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    console.log("edit Lead data,header", data, headers);
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editLeadDetails(data);

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
export const getLead = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getLeadDetails(data);

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
export const getLeads = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getLeadsDetails();

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

export const deleteLead = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteLeadDetails(data);

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

//=============================End Lead controllers================================
