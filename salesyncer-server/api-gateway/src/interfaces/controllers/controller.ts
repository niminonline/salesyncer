import { Request, Response } from "express";
import logger from "../../services/winston";
import {
  publishAdminLogin,
  publishEmployeeLogin,
  publishPasswordUpdate,
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
  cancelLeaveDetails,
  editBranchDetails,
  deleteTargetDetails,
  editTargetDetails,
  createTargetDetails,
  setBranchTargetDetails,
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
  createActivityDetails,
  editActivityDetails,
  getActivityDetails,
  getActivitiesDetails,
  deleteActivityDetails,
  deleteProductDetails,
  getProductDetails,
  editProductDetails,
  createProductDetails,
  deleteSaleDetails,
  getSalesDetails,
  getSaleDetails,
  editSaleDetails,
  createSaleDetails,
  deleteActivityTypeDetails,
  getActivityTypesDetails,
  editActivityTypeDetails,
  createActivityTypeDetails,
  deleteProductCategoryDetails,
  editProductCategoryDetails,
  createProductCategoryDetails,
  editLeadSourceDetails,
  createLeadSourceDetails,
  deleteLeadSourceDetails,
} from "../../usecases/business";




//=============================Update Auth Password===================================

export const updateAuthPassword = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response: any = await publishPasswordUpdate(data);

    delete response.requestId;
    delete response.action;
    res.json(response);
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//=============================Login Controllers===================================
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response: any = await publishAdminLogin(data);

    delete response.requestId;
    delete response.action;
    res.json(response);
  } catch (error) {
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//===================================End Login Controllers===============================

//====================================Employee Controllers===============================

export const getEmployeeDetails = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const employeeData = req.body;
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addBranch = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await addBranchDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editBranch = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editBranchDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//==============================================End Branch Controllers=======================


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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const applyLeave = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const leaveData = req.body;
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const leaveAction = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelLeave = async (req: Request, res: Response) => {
  try {
    const _id = req.query;
    const headers = req.headers;

    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const data = { _id };
      const response: any = await cancelLeaveDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//======================================End Leave Controllers=============================

//====================================Contact Controllers===============================
export const createContact = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editContact = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================End Contact controllers================================

//====================================Lead Controllers===============================
export const createLead = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editLead = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================End Lead controllers================================

//====================================Activity Controllers===============================
export const createActivity = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createActivityDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editActivity = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editActivityDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getActivity = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getActivityDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getActivities = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getActivitiesDetails();

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteActivityDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================End Activity controllers================================

//====================================Product Controllers===============================
export const createProduct = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createProductDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editProduct = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editProductDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getProduct = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getProductDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteProductDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================End Product controllers================================

//====================================Sale Controllers===============================
export const createSale = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createSaleDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editSale = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editSaleDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getSale = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getSaleDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getSales = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getSalesDetails();

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteSaleDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================End Sale controllers================================

//====================================Target Controllers===============================
export const createTarget = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createTargetDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const setBranchTarget = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await setBranchTargetDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editTarget = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editTargetDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTarget = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const { _id } = req.query;
    const data = { _id };
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteTargetDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================End Target controllers================================

//====================================Actvity Type Controllers===============================
export const createActivityType = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createActivityTypeDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editActivityType = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editActivityTypeDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getActivityTypes = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await getActivityTypesDetails();

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteActivityType = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const data = { _id };
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteActivityTypeDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================End Activity Type controllers================================

//====================================Product Category Controllers===============================
export const createProductCategory = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createProductCategoryDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editProductCategory = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editProductCategoryDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProductCategory = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const data = { _id };
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteProductCategoryDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================Product category controllers================================

//====================================Lead Source Controllers===============================
export const createLeadSource = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await createLeadSourceDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const editLeadSource = async (req: Request, res: Response) => {
  try {
    const headers = req.headers;
    const data = req.body;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await editLeadSourceDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteLeadSource = async (req: Request, res: Response) => {
  try {
    const { _id } = req.query;
    const data = { _id };
    const headers = req.headers;
    const response: any = await verifyToken(headers);
    if (response.status == "OK") {
      const response: any = await deleteLeadSourceDetails(data);

      delete response.requestId;
      delete response.action;
      res.json(response);
    } else {
      res.json(response);
    }
  } catch (error) {
    logger.error("Error in /auth:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//=============================Lead Source controllers================================
