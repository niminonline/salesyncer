import { Redis } from "ioredis";
import logger from "../../services/winston";
import {
  getEmployeeDetails,
  addEmployeeDetails,
  getBranchDetails,
  addBranchDetails,
  getEmployeesDetails,
  getEmployeeDataWithEmail,
  updateEmployeeDetails,
  getLeaveCategoryDetails,
  applyLeaveDetails,
  fetchLeaveDetails,
  getLeaveRequests,
  doLeaveAction,
  cancelLeaveDetails,
  editBranchDetails,
  createTargetDetails,
  setBranchTargetDetails,
  updateAchievedTargetDetails,
} from "../controllers/controller";

const redisSubscriber = new Redis({
  host:'redis',
  port: 6379,
});
// const redisSubscriber = new Redis();


export const subscribeToChannel = (channelName: string) => {
  redisSubscriber.subscribe(channelName, (error, count) => {
    if (error) {
      logger.error(`Error subscribing to ${channelName}:`, error);
    } else {
      logger.info(`Subscribed to ${channelName}. Count: ${count}`);
    }
  });
};

// Listen for messages
redisSubscriber.on("message", (channel: string, message: any) => {
  if (channel === "office-service") {
    const data = JSON.parse(message);

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
      case "editBranchDetails":
        editBranchDetails(data);
        break;
      case "getEmployeesDetails":
        getEmployeesDetails(data);
        break;
      case "getEmployeeDataWithEmail":
        getEmployeeDataWithEmail(data);
        break;
      case "updateEmployeeDetails":
        updateEmployeeDetails(data);
        break;
      case "getLeaveCategoryDetails":
        getLeaveCategoryDetails(data);
        break;
      case "applyLeaveDetails":
        applyLeaveDetails(data);
        break;
      case "fetchLeaveDetails":
        fetchLeaveDetails(data);
        break;

      case "getLeaveRequests":
        getLeaveRequests(data);
        break;
      case "doLeaveAction":
        doLeaveAction(data);
        break;
      case "cancelLeaveDetails":
        cancelLeaveDetails(data);
        break;
      case "createTargetDetails":
        createTargetDetails(data);
        break;
      case "setBranchTargetDetails":
        setBranchTargetDetails(data);
        break;
      case "updateAchievedTargetDetails":
        updateAchievedTargetDetails(data);
        break;
   
    }
  }
});
