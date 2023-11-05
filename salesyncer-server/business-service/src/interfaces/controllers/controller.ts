import { publishToChannel } from "../../services/redisOps";
import createActivityData from "../../usecases/createActivityData";
import createActivityTypeData from "../../usecases/createActivityTypeData ";
import createContactData from "../../usecases/createContactData";
import createLeadData from "../../usecases/createLeadData ";
import createProductData from "../../usecases/createProductData";
import createSaleData from "../../usecases/createSaleData";
import deleteActivityData from "../../usecases/deleteActivityData";
import deleteActivityTypeData from "../../usecases/deleteActivityTypeData";
import deleteContactData from "../../usecases/deleteContactData";
import deleteLeadData from "../../usecases/deleteLeadData";
import deleteProductData from "../../usecases/deleteProductData";
import deleteSaleData from "../../usecases/deleteSaleData ";
import editActivityData from "../../usecases/editActivityData";
import editActivityTypeData from "../../usecases/editActivityTypeData";
import editContactData from "../../usecases/editContactData";
import editLeadData from "../../usecases/editLeadData";
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

// export const getProductsDetails = async (data: any) => {
//   try {
//     const { requestId, action } = data;
//     // console.log("Request id, action from office controller", requestId, action);
//     const response: any = await getProductsData();
//     if (response.status == "OK") {
//       const data = {
//         productsData: response.productsData,
//         requestId,
//         action,
//         status: "OK",
//         message: "Products data fetched successfully",
//       };
//       // console.log("fetched employees data", data);
//       publishToChannel("ApiRes-getProductsDetails", data);
//     } else {
//       publishToChannel("ApiRes-getProductsDetails", {
//         requestId,
//         action,
//         status: "FAILED",
//         message: response.message,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };












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




//============================Activity Controllers=====================================================

export const createActivityDetails = async (data: any) => {
  try {
    // console.log("Req body of Activity Controller", data);
    const { requestId, action } = data;
    // console.log("email of Activity Controller", email);

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

    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};
export const editActivityDetails = async (data: any) => {
  try {
    // console.log("Req body of Activity Controller", data);
    const { requestId, action } = data;
    // console.log("email of Activity Controller", email);

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
    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};

export const getActivityDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    // console.log("Request id, action from activity controller", requestId, action);
    const response: any = await getActivityData(_id);
    if (response.status == "OK") {
      const data = {
        activityData: response.activityData,
        requestId,
        action,
        status: "OK",
        message: "Activity data fetched successfully",
      };
      // console.log("fetched employees data", data);
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
    console.error(error);
  }
};

export const getActivitiesDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from activities controller", requestId, action);
    const response: any = await getActivitiesData();
    if (response.status == "OK") {
      const data = {
        activitiesData: response.activitiesData,
        requestId,
        action,
        status: "OK",
        message: "Activities data fetched successfully",
      };
      // console.log("fetched activities data", data);
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
    console.error(error);
  }
};

export const deleteActivityDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    console.log(
      "Request id, action from activity controller",
      requestId,
      action,
      _id
    );
    const response: any = await deleteActivityData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Activity deleted successfully",
      };
      // console.log("fetched employees data", data);
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
    console.error(error);
  }
};

//============================End Activity Controllers=====================================================



//============================Product Controllers=====================================================

export const createProductDetails = async (data: any) => {
  try {
    // console.log("Req body of Product Controller", data);
    const { requestId, action } = data;
    // console.log("email of Product Controller", email);

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

    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};
export const editProductDetails = async (data: any) => {
  try {
    // console.log("Req body of Product Controller", data);
    const { requestId, action } = data;
    // console.log("email of Product Controller", email);

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
    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};

export const getProductDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    // console.log("Request id, action from Product controller", requestId, action);
    const response: any = await getProductData(_id);
    if (response.status == "OK") {
      const data = {
        productData: response.productData,
        requestId,
        action,
        status: "OK",
        message: "Product data fetched successfully",
      };
      // console.log("fetched Product data", data);
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
    console.error(error);
  }
};

export const getProductsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from Products controller", requestId, action);
    const response: any = await getProductsData();
    if (response.status == "OK") {
      const data = {
        productsData: response.productsData,
        requestId,
        action,
        status: "OK",
        message: "Products data fetched successfully",
      };
      // console.log("fetched activities data", data);
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

export const deleteProductDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    console.log(
      "Request id, action from Product controller",
      requestId,
      action,
      _id
    );
    const response: any = await deleteProductData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Product deleted successfully",
      };
      // console.log("fetched employees data", data);
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
    console.error(error);
  }
};

//============================End Product Controllers=====================================================



//============================Sale Controllers=====================================================

export const createSaleDetails = async (data: any) => {
  try {
    // console.log("Req body of Sale Controller", data);
    const { requestId, action } = data;
    // console.log("email of Sale Controller", email);

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

    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};
export const editSaleDetails = async (data: any) => {
  try {
    // console.log("Req body of Sale Controller", data);
    const { requestId, action } = data;
    // console.log("email of Sale Controller", email);

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
    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};

export const getSaleDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    // console.log("Request id, action from Sale controller", requestId, action);
    const response: any = await getSaleData(_id);
    if (response.status == "OK") {
      const data = {
        saleData: response.saleData,
        requestId,
        action,
        status: "OK",
        message: "Sale data fetched successfully",
      };
      // console.log("fetched Sale data", data);
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
    console.error(error);
  }
};

export const getSalesDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from PSales controller", requestId, action);
    const response: any = await getSalesData();
    if (response.status == "OK") {
      const data = {
        salesData: response.salesData,
        requestId,
        action,
        status: "OK",
        message: "Sales data fetched successfully",
      };
      // console.log("fetched Sale data", data);
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
    console.error(error);
  }
};

export const deleteSaleDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    console.log(
      "Request id, action from Sale controller",
      requestId,
      action,
      _id
    );
    const response: any = await deleteSaleData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "Sale deleted successfully",
      };
      // console.log("fetched Sale data", data);
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
    console.error(error);
  }
};

//============================End Sale Controllers=====================================================



// //============================Target Controllers=====================================================

// export const createTargetDetails = async (data: any) => {
//   try {
//     // console.log("Req body of Target Controller", data);
//     const { requestId, action } = data;
//     // console.log("email of Target Controller", email);

//     const response: any = await createTargetData(data);

//     if (response) {
//       response.requestId = requestId;
//       response.action = action;
//       publishToChannel("ApiRes-createTargetDetails", response);
//     } else {
//       publishToChannel("ApiRes-createTargetDetails", {
//         status: "FAILED",
//         message: "Target creation failed",
//       });
//     }

//     // console.log("myresponse", response);
//   } catch (error) {
//     console.error(error);
//   }
// };
// export const editTargetDetails = async (data: any) => {
//   try {
//     // console.log("Req body of Target Controller", data);
//     const { requestId, action } = data;
//     // console.log("email of Target Controller", email);

//     const response: any = await editTargetData(data);

//     if (response) {
//       response.requestId = requestId;
//       response.action = action;
//       publishToChannel("ApiRes-editTargetDetails", response);
//     } else {
//       publishToChannel("ApiRes-editTargetDetails", {
//         status: "FAILED",
//         message: "Target updation failed",
//       });
//     }
//     // console.log("myresponse", response);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getTargetDetails = async (data: any) => {
//   try {
//     const { _id, requestId, action } = data;
//     // console.log("Request id, action from Target controller", requestId, action);
//     const response: any = await getTargetData(_id);
//     if (response.status == "OK") {
//       const data = {
//         targetData: response.targetData,
//         requestId,
//         action,
//         status: "OK",
//         message: "Target data fetched successfully",
//       };
//       // console.log("fetched Target data", data);
//       publishToChannel("ApiRes-getTargetDetails", data);
//     } else {
//       publishToChannel("ApiRes-getTargetDetails", {
//         requestId,
//         action,
//         status: "FAILED",
//         message: response.message,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getTargetsDetails = async (data: any) => {
//   try {
//     const { requestId, action } = data;
//     // console.log("Request id, action from Target controller", requestId, action);
//     const response: any = await getTargetsData();
//     if (response.status == "OK") {
//       const data = {
//         targetsData: response.targetsData,
//         requestId,
//         action,
//         status: "OK",
//         message: "Target data fetched successfully",
//       };
//       // console.log("fetched Sale data", data);
//       publishToChannel("ApiRes-getTargetsDetails", data);
//     } else {
//       publishToChannel("ApiRes-getTargetsDetails", {
//         requestId,
//         action,
//         status: "FAILED",
//         message: response.message,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const deleteTargetDetails = async (data: any) => {
//   try {
//     const { _id, requestId, action } = data;
//     console.log(
//       "Request id, action from Target controller",
//       requestId,
//       action,
//       _id
//     );
//     const response: any = await deleteTargetData(_id);
//     if (response.status == "OK") {
//       const data = {
//         requestId,
//         action,
//         status: "OK",
//         message: "Target deleted successfully",
//       };
//       // console.log("fetched Sale data", data);
//       publishToChannel("ApiRes-deleteTargetDetails", data);
//     } else {
//       publishToChannel("ApiRes-deleteTargetDetails", {
//         requestId,
//         action,
//         status: "FAILED",
//         message: response.message,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// //============================End Target Controllers=====================================================




//============================ActivityType Controllers=====================================================

export const createActivityTypeDetails = async (data: any) => {
  try {
    // console.log("Req body of ActivityType Controller", data);
    const { requestId, action } = data;
    // console.log("email of ActivityType Controller", email);

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

    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};
export const editActivityTypeDetails = async (data: any) => {
  try {
    // console.log("Req body of ActivityType Controller", data);
    const { requestId, action } = data;
    // console.log("email of ActivityType Controller", email);

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
    // console.log("myresponse", response);
  } catch (error) {
    console.error(error);
  }
};

export const getActivityTypesDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    console.log("Request id, action from actypes controller", requestId, action);
    const response: any = await getActivityTypesData();
    if (response.status == "OK") {
      const data = {
        activityTypes: response.activityTypesData,
        requestId,
        action,
        status: "OK",
        message: "ActivityTypes data fetched successfully",
      };
      // console.log("fetched Sale data", data);
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
    console.error(error);
  }
};

export const deleteActivityTypeDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    console.log(
      "Request id, action from ActivityType controller",
      requestId,
      action,
      _id
    );
    const response: any = await deleteActivityTypeData(_id);
    if (response.status == "OK") {
      const data = {
        requestId,
        action,
        status: "OK",
        message: "ActivityType deleted successfully",
      };
      // console.log("fetched Sale data", data);
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
    console.error(error);
  }
};

//============================End ActivityType Controllers=====================================================
