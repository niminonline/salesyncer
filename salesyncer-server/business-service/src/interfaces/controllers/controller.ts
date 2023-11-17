import { publishToChannel } from "../../services/redisOps";
import logger from "../../services/winston";
import createActivityData from "../../usecases/createActivityData";
import createActivityTypeData from "../../usecases/createActivityTypeData ";
import createContactData from "../../usecases/createContactData";
import createLeadData from "../../usecases/createLeadData ";
import createLeadSourceData from "../../usecases/createLeadSourceData";
import createProductCategoryData from "../../usecases/createProductCategoryData ";
import createProductData from "../../usecases/createProductData";
import createSaleData from "../../usecases/createSaleData";
import deleteActivityData from "../../usecases/deleteActivityData";
import deleteActivityTypeData from "../../usecases/deleteActivityTypeData";
import deleteContactData from "../../usecases/deleteContactData";
import deleteLeadData from "../../usecases/deleteLeadData";
import deleteLeadSourceData from "../../usecases/deleteLeadSourceData";
import deleteProductCategoryData from "../../usecases/deleteProductCategoryData";
import deleteProductData from "../../usecases/deleteProductData";
import deleteSaleData from "../../usecases/deleteSaleData ";
import editActivityData from "../../usecases/editActivityData";
import editActivityTypeData from "../../usecases/editActivityTypeData";
import editContactData from "../../usecases/editContactData";
import editLeadData from "../../usecases/editLeadData";
import editLeadSourceData from "../../usecases/editLeadSourceDetails";
import editProductCategoryData from "../../usecases/editProductCategoryData";
import editProductData from "../../usecases/editProductData";
import editSaleData from "../../usecases/editSaleData";
import getActivitiesData from "../../usecases/getActivitiesData";
import getActivityData from "../../usecases/getActivityData";
import getActivityTypesData from "../../usecases/getActivityTypesData";
import getContactData from "../../usecases/getContactData";
import getContactsData from "../../usecases/getContactsData";
import getLeadData from "../../usecases/getLeadData";
import getLeadSourceData from "../../usecases/getLeadSourceData";
import getLeadsData from "../../usecases/getLeadsData";
import getProductCategoryData from "../../usecases/getProductCategoryData";
import getProductData from "../../usecases/getProductData";
import getProductsData from "../../usecases/getProductsData";
import getSaleData from "../../usecases/getSaleData ";
import getSalesData from "../../usecases/getSalesData ";

//============================Contact Controllers==============================================

export const createContactDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

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
  } catch (error) {
    logger.error(error);
  }
};
export const editContactDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

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
  } catch (error) {
    logger.error(error);
  }
};

export const getContactDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await getContactData(_id);
    if (response.status == "OK") {
      const data = {
        contactData: response.contactData,
        requestId,
        action,
        status: "OK",
        message: "Contact data fetched successfully",
      };
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
    logger.error(error);
  }
};

export const getContactsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getContactsData();
    if (response.status == "OK") {
      const data = {
        contactsData: response.contactsData,
        requestId,
        action,
        status: "OK",
        message: "Contacts data fetched successfully",
      };
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
    logger.error(error);
  }
};

export const deleteContactDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteContactData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Contact deleted successfully",
      };
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
    logger.error(error);
  }
};

//============================End Contact Controllers==============================================

//============================Lead Controllers=====================================================

export const createLeadDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

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
  } catch (error) {
    logger.error(error);
  }
};
export const editLeadDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

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
  } catch (error) {
    logger.error(error);
  }
};

export const getLeadDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await getLeadData(_id);
    if (response.status == "OK") {
      const data = {
        LeadData: response.leadData,
        requestId,
        action,
        status: "OK",
        message: "Lead data fetched successfully",
      };
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
    logger.error(error);
  }
};

export const getLeadsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getLeadsData();
    if (response.status == "OK") {
      const data = {
        leadsData: response.leadsData,
        requestId,
        action,
        status: "OK",
        message: "Leads data fetched successfully",
      };
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
    logger.error(error);
  }
};

export const deleteLeadDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteLeadData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Lead deleted successfully",
      };
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
    logger.error(error);
  }
};

//============================End Lead Controllers=====================================================

//============================Activity Controllers=====================================================

export const createActivityDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await createActivityData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createActivityDetails", response);
    } else {
      publishToChannel("ApiRes-createActivityDetails", {
        status: "FAILED",
        message: "Activity creation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
export const editActivityDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await editActivityData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editActivityDetails", response);
    } else {
      publishToChannel("ApiRes-editActivityDetails", {
        status: "FAILED",
        message: "Activity updation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getActivityDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await getActivityData(_id);
    if (response.status == "OK") {
      const data = {
        activityData: response.activityData,
        requestId,
        action,
        status: "OK",
        message: "Activity data fetched successfully",
      };
      publishToChannel("ApiRes-getActivityDetails", data);
    } else {
      publishToChannel("ApiRes-getActivityDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getActivitiesDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getActivitiesData();
    if (response.status == "OK") {
      const data = {
        activitiesData: response.activitiesData,
        requestId,
        action,
        status: "OK",
        message: "Activities data fetched successfully",
      };
      publishToChannel("ApiRes-getActivitiesDetails", data);
    } else {
      publishToChannel("ApiRes-getActivitiesDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const deleteActivityDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteActivityData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Activity deleted successfully",
      };
      publishToChannel("ApiRes-deleteActivityDetails", data);
    } else {
      publishToChannel("ApiRes-deleteActivityDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

//============================End Activity Controllers=====================================================

//============================Product Controllers=====================================================

export const createProductDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await createProductData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createProductDetails", response);
    } else {
      publishToChannel("ApiRes-createProductDetails", {
        status: "FAILED",
        message: "Product creation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
export const editProductDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await editProductData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editProductDetails", response);
    } else {
      publishToChannel("ApiRes-editProductDetails", {
        status: "FAILED",
        message: "Product updation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getProductDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await getProductData(_id);
    if (response.status == "OK") {
      const data = {
        productData: response.productData,
        requestId,
        action,
        status: "OK",
        message: "Product data fetched successfully",
      };
      publishToChannel("ApiRes-getProductDetails", data);
    } else {
      publishToChannel("ApiRes-getProductDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getProductsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getProductsData();
    if (response.status == "OK") {
      const data = {
        productsData: response.productsData,
        requestId,
        action,
        status: "OK",
        message: "Products data fetched successfully",
      };
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
    logger.error(error);
  }
};

export const deleteProductDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteProductData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Product deleted successfully",
      };
      publishToChannel("ApiRes-deleteProductDetails", data);
    } else {
      publishToChannel("ApiRes-deleteProductDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

//============================End Product Controllers=====================================================

//============================Sale Controllers=====================================================

export const createSaleDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await createSaleData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createSaleDetails", response);
    } else {
      publishToChannel("ApiRes-createSaleDetails", {
        status: "FAILED",
        message: "Sale creation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
export const editSaleDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await editSaleData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editSaleDetails", response);
    } else {
      publishToChannel("ApiRes-editSaleDetails", {
        status: "FAILED",
        message: "Sale updation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getSaleDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await getSaleData(_id);
    if (response.status == "OK") {
      const data = {
        saleData: response.saleData,
        requestId,
        action,
        status: "OK",
        message: "Sale data fetched successfully",
      };
      publishToChannel("ApiRes-getSaleDetails", data);
    } else {
      publishToChannel("ApiRes-getSaleDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getSalesDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getSalesData();
    if (response.status == "OK") {
      const data = {
        salesData: response.salesData,
        requestId,
        action,
        status: "OK",
        message: "Sales data fetched successfully",
      };
      publishToChannel("ApiRes-getSalesDetails", data);
    } else {
      publishToChannel("ApiRes-getSalesDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const deleteSaleDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteSaleData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Sale deleted successfully",
      };
      publishToChannel("ApiRes-deleteSaleDetails", data);
    } else {
      publishToChannel("ApiRes-deleteSaleDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

//============================End Sale Controllers=====================================================

//============================ActivityType Controllers=====================================================

export const createActivityTypeDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await createActivityTypeData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createActivityTypeDetails", response);
    } else {
      publishToChannel("ApiRes-createActivityTypeDetails", {
        status: "FAILED",
        message: "ActivityType creation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
export const editActivityTypeDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await editActivityTypeData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editActivityTypeDetails", response);
    } else {
      publishToChannel("ApiRes-editActivityTypeDetails", {
        status: "FAILED",
        message: "ActivityType updation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getActivityTypesDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getActivityTypesData();
    if (response.status == "OK") {
      const data = {
        activityTypesData: response.activityTypesData,
        requestId,
        action,
        status: "OK",
        message: "ActivityTypes data fetched successfully",
      };
      publishToChannel("ApiRes-getActivityTypesDetails", data);
    } else {
      publishToChannel("ApiRes-getActivityTypesDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const deleteActivityTypeDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteActivityTypeData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "ActivityType deleted successfully",
      };
      publishToChannel("ApiRes-deleteActivityTypeDetails", data);
    } else {
      publishToChannel("ApiRes-deleteActivityTypeDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

//============================End ActivityType Controllers=====================================================

//============================Product Category Controllers=====================================================

export const createProductCategoryDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await createProductCategoryData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createProductCategoryDetails", response);
    } else {
      publishToChannel("ApiRes-createProductCategoryDetails", {
        status: "FAILED",
        message: "Product Category creation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
export const editProductCategoryDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await editProductCategoryData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editProductCategoryDetails", response);
    } else {
      publishToChannel("ApiRes-editProductCategoryDetails", {
        status: "FAILED",
        message: "Product Category updation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getProductCategoryDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getProductCategoryData();
    if (response.status == "OK") {
      const data = {
        productCategoriesData: response.productCategoriesData,
        requestId,
        action,
        status: "OK",
        message: "Product Category data fetched successfully",
      };
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
    logger.error(error);
  }
};

export const deleteProductCategoryDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteProductCategoryData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Product Category deleted successfully",
      };
      publishToChannel("ApiRes-deleteProductCategoryDetails", data);
    } else {
      publishToChannel("ApiRes-deleteProductCategoryDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

//============================End ActivityType Controllers=====================================================

//============================Lead Source Controllers=====================================================

export const createLeadSourceDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await createLeadSourceData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-createLeadSourceDetails", response);
    } else {
      publishToChannel("ApiRes-createLeadSourceDetails", {
        status: "FAILED",
        message: "Lead Source Category creation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
export const editLeadSourceDetails = async (data: any) => {
  try {
    const { requestId, action } = data;

    const response: any = await editLeadSourceData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
      publishToChannel("ApiRes-editLeadSourceDetails", response);
    } else {
      publishToChannel("ApiRes-editLeadSourceDetails", {
        status: "FAILED",
        message: "Lead Source Category updation failed",
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getLeadSourceDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    const response: any = await getLeadSourceData();
    if (response.status == "OK") {
      const data = {
        leadSourceData: response.leadSourceData,
        requestId,
        action,
        status: "OK",
        message: "Lead Source data fetched successfully",
      };
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
    logger.error(error);
  }
};
export const deleteLeadSourceDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    const response: any = await deleteLeadSourceData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Lead Source deleted successfully",
      };
      publishToChannel("ApiRes-deleteLeadSourceDetails", data);
    } else {
      publishToChannel("ApiRes-deleteLeadSourceDetails", {
        requestId,
        action,
        status: "FAILED",
        message: response.message,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

//============================End Lead Source Controllers=====================================================
