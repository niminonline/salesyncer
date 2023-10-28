import { publishToChannel } from "../../services/redisOps";
import createContactData from "../../usecases/createContactData";
import createLeadData from "../../usecases/createLeadData ";
import deleteContactData from "../../usecases/deleteContactData";
import deleteLeadData from "../../usecases/deleteLeadData";
import editContactData from "../../usecases/editContactData";
import editLeadData from "../../usecases/editLeadData";
import getContactData from "../../usecases/getContactData";
import getContactsData from "../../usecases/getContactsData";
import getLeadData from "../../usecases/getLeadData";
import getLeadSourceData from "../../usecases/getLeadSourceData";
import getLeadsData from "../../usecases/getLeadsData";
import getProductCategoryData from "../../usecases/getProductCategoryData";
import getProductsData from "../../usecases/getProductsData";



//============================Lead Source Controllers==============================================

export const getLeadSourceDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getLeadSourceData();
    if (response.status == "OK") {
      const data = {
        leadSourceData: response.leadSourceData,
        requestId,
        action,
        status: "OK",
        message: "LeadSource data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getLeadSourceDetails", data);
    } else {
      publishToChannel("ApiRes-getLeadSourceDetails", {
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



//============================End Lead Source Controllers==============================================



//============================Product Controllers==============================================

export const getProductCategoryDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getProductCategoryData();
    if (response.status == "OK") {
      const data = {
        productCategoryData: response.productCategoryData,
        requestId,
        action,
        status: "OK",
        message: "Product Category data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getProductCategoryDetails", data);
    } else {
      publishToChannel("ApiRes-getProductCategoryDetails", {
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

export const getProductsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getProductsData();
    if (response.status == "OK") {
      const data = {
        productsData: response.productsData,
        requestId,
        action,
        status: "OK",
        message: "Products data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getProductsDetails", data);
    } else {
      publishToChannel("ApiRes-getProductsDetails", {
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












//============================End Product Controllers==============================================




//============================Contact Controllers==============================================

export const createContactDetails = async (data: any) => {
  try {
    // console.log("Req body of getEmployeeDetails Controller", data);
    const { requestId, action } = data;
    // console.log("email of getEmployeeDetails Controller", email);

    const response: any = await createContactData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createContactDetails", response);
    } else {
      publishToChannel("ApiRes-createContactDetails", {
        status: "FAILED",
        message: "Contact creation failed",
      });
    }

    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};
export const editContactDetails = async (data: any) => {
  try {
    // console.log("Req body of getEmployeeDetails Controller", data);
    const { requestId, action } = data;
    // console.log("email of getEmployeeDetails Controller", email);

    const response: any = await editContactData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editContactDetails", response);
    } else {
      publishToChannel("ApiRes-editContactDetails", {
        status: "FAILED",
        message: "Contact Updation failed",
      });
    }
    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};

export const getContactDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getContactData(_id);
    if (response.status == "OK") {
      const data = {
        contactData: response.contactData,
        requestId,
        action,
        status: "OK",
        message: "Contact data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getContactDetails", data);
    } else {
      publishToChannel("ApiRes-getContactDetails", {
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

export const getContactsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getContactsData();
    if (response.status == "OK") {
      const data = {
        contactsData: response.contactsData,
        requestId,
        action,
        status: "OK",
        message: "Contacts data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getContactsDetails", data);
    } else {
      publishToChannel("ApiRes-getContactsDetails", {
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

export const deleteContactDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    console.log(
      "Request id, action from office controller",
      requestId,
      action,
      _id
    );
    const response: any = await deleteContactData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Contact deleted successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-deleteContactDetails", data);
    } else {
      publishToChannel("ApiRes-deleteContactDetails", {
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

//============================End Contact Controllers==============================================

//============================Lead Controllers=====================================================

export const createLeadDetails = async (data: any) => {
  try {
    // console.log("Req body of getEmployeeDetails Controller", data);
    const { requestId, action } = data;
    // console.log("email of getEmployeeDetails Controller", email);

    const response: any = await createLeadData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createLeadDetails", response);
    } else {
      publishToChannel("ApiRes-createLeadDetails", {
        status: "FAILED",
        message: "Lead creation failed",
      });
    }

    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};
export const editLeadDetails = async (data: any) => {
  try {
    // console.log("Req body of getEmployeeDetails Controller", data);
    const { requestId, action } = data;
    // console.log("email of getEmployeeDetails Controller", email);

    const response: any = await editLeadData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editLeadDetails", response);
    } else {
      publishToChannel("ApiRes-editLeadDetails", {
        status: "FAILED",
        message: "Lead updation failed",
      });
    }
    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};

export const getLeadDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getLeadData(_id);
    if (response.status == "OK") {
      const data = {
        LeadData: response.leadData,
        requestId,
        action,
        status: "OK",
        message: "Lead data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getLeadDetails", data);
    } else {
      publishToChannel("ApiRes-getLeadDetails", {
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

export const getLeadsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getLeadsData();
    if (response.status == "OK") {
      const data = {
        leadsData: response.leadsData,
        requestId,
        action,
        status: "OK",
        message: "Leads data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getLeadsDetails", data);
    } else {
      publishToChannel("ApiRes-getLeadsDetails", {
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

export const deleteLeadDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    console.log(
      "Request id, action from office controller",
      requestId,
      action,
      _id
    );
    const response: any = await deleteLeadData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Lead deleted successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-deleteLeadDetails", data);
    } else {
      publishToChannel("ApiRes-deleteLeadDetails", {
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

//============================End Lead Controllers=====================================================
