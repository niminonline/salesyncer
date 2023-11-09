import { Redis } from "ioredis";
import {
  createContactDetails,
  editContactDetails,
  getContactDetails,
  getContactsDetails,
  deleteContactDetails,
  createLeadDetails,
  editLeadDetails,
  getLeadDetails,
  getLeadsDetails,
  deleteLeadDetails,
  getLeadSourceDetails,
  getProductCategoryDetails,
  getProductsDetails,
  createActivityDetails,
  editActivityDetails,
  getActivityDetails,
  getActivitiesDetails,
  deleteActivityDetails,
  createProductDetails,
  editProductDetails,
  getProductDetails,
  deleteProductDetails,
  editSaleDetails,
  createSaleDetails,
  getSaleDetails,
  getSalesDetails,
  deleteSaleDetails,
  createActivityTypeDetails,
  editActivityTypeDetails,
  getActivityTypesDetails,
  deleteActivityTypeDetails,
  createProductCategoryDetails,
  editProductCategoryDetails,
  deleteProductCategoryDetails,
  // createTargetDetails,
  // editTargetDetails,
  // getTargetDetails,
  // getTargetsDetails,
  // deleteTargetDetails,
} from "../controllers/controller";

const redisSubscriber = new Redis();

export const subscribeToChannel = (channelName: string) => {
  redisSubscriber.subscribe(channelName, (error, count) => {
    if (error) {
      console.error(`Error subscribing to ${channelName}:`, error);
    } else {
      console.log(`Subscribed to ${channelName}. Count: ${count}`);
    }
  });
};

// Listen for messages
redisSubscriber.on("message", (channel: string, message: any) => {
  if (channel === "business-service") {
    const data = JSON.parse(message);

    switch (data.action) {
      case "getLeadSourceDetails":
        getLeadSourceDetails(data);
        break;
      case "getProductCategoryDetails":
        getProductCategoryDetails(data);
        break;
      case "getProductsDetails":
        getProductsDetails(data);
        break;
      case "createContactDetails":
        createContactDetails(data);
        break;

      case "editContactDetails":
        editContactDetails(data);
        break;

      case "getContactDetails":
        getContactDetails(data);
        break;

      case "getContactsDetails":
        getContactsDetails(data);
        break;
      case "deleteContactDetails":
        deleteContactDetails(data);
        break;

        
      case "createLeadDetails":
        createLeadDetails(data);
        break;

      case "editLeadDetails":
        editLeadDetails(data);
        break;

      case "getLeadDetails":
        getLeadDetails(data);
        break;

      case "getLeadsDetails":
        getLeadsDetails(data);
        break;
      case "deleteLeadDetails":
        deleteLeadDetails(data);
        break;


      case "createActivityDetails":
        createActivityDetails(data);
        break;

      case "editActivityDetails":
        editActivityDetails(data);
        break;

      case "getActivityDetails":
        getActivityDetails(data);
        break;

      case "getActivitiesDetails":
        getActivitiesDetails(data);
        break;
      case "deleteActivityDetails":
        deleteActivityDetails(data);
        break;


      case "createProductDetails":
        createProductDetails(data);
        break;

      case "editProductDetails":
        editProductDetails(data);
        break;

      case "getProductDetails":
        getProductDetails(data);
        break;

      case "getProductsDetails":
        getProductsDetails(data);
        break;
      case "deleteProductDetails":
        deleteProductDetails(data);
        break;


      case "createSaleDetails":
        createSaleDetails(data);
        break;

      case "editSaleDetails":
        editSaleDetails(data);
        break;

      case "getSaleDetails":
        getSaleDetails(data);
        break;

      case "getSalesDetails":
        getSalesDetails(data);
        break;
      case "deleteSaleDetails":
        deleteSaleDetails(data);
        break;



      // case "createTargetDetails":
      //   createTargetDetails(data);
      //   break;

      // case "editTargetDetails":
      //   editTargetDetails(data);
      //   break;

      // case "getTargetDetails":
      //   getTargetDetails(data);
      //   break;

      // case "getTargetsDetails":
      //   getTargetsDetails(data);
      //   break;
      // case "deleteTargetDetails":
      //   deleteTargetDetails(data);
      //   break;

      case "createActivityTypeDetails":
        createActivityTypeDetails(data);
        break;

      case "editActivityTypeDetails":
        editActivityTypeDetails(data);
        break;

      case "getActivityTypesDetails":
        getActivityTypesDetails(data);
        break;
      case "deleteActivityTypeDetails":
        deleteActivityTypeDetails(data);
        break;

        
      case "createProductCategoryDetails":
        createProductCategoryDetails(data);
        break;

      case "editProductCategoryDetails":
        editProductCategoryDetails(data);
        break;

     
      case "deleteProductCategoryDetails":
        deleteProductCategoryDetails(data);
        break;
    }
  }
});
