import { Redis } from "ioredis";
import { createContactDetails, editContactDetails, getContactDetails, getContactsDetails,deleteContactDetails } from "../controllers/controller";
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
    }
  }
});
