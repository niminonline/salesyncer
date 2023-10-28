import { Redis } from "ioredis";
import { createContactDetails, editContactDetails, getContactDetails, getContactsDetails,deleteContactDetails, createLeadDetails, editLeadDetails, getLeadDetails, getLeadsDetails, deleteLeadDetails, getLeadSourceDetails, getProductCategoryDetails, getProductsDetails } from "../controllers/controller";
// import { adminLogin,employeeLogin } from "../controllers/controller";

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
    console.log("Data from api", data);

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
    }
  }
});
