import { Redis } from "ioredis";
import {
  getEmployeeDetails,
  addEmployeeDetails,
  getBranchDetails,
  addBranchDetails
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
  if (channel === "office-service") {
    const data = JSON.parse(message);
    //console.log("Data from api", data);

    switch (data.action) {
      case "getEmployeeData":
        getEmployeeDetails(data);
        break;
      case "addEmployeeData":
        addEmployeeDetails(data);
        break;
      case "getBranchDetails":
        getBranchDetails(data);
        break;
      case "addBranchDetails":
        addBranchDetails(data);
        break;
    }
  }
});