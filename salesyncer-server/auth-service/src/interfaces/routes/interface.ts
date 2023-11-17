import { Redis } from "ioredis";
import { adminLogin,employeeLogin,verifyToken,addEmployeeToAuthDb,updateAuthEmail } from "../controllers/controller";
import logger from "../../services/winston";

const redisSubscriber = new Redis();

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
  if (channel === "auth-service") {
    const data = JSON.parse(message);

    switch (data.action) {
      case "adminLogin":
        adminLogin(data);
        break;
      case "employeeLogin":
        employeeLogin(data);
        break;
      case "verifyToken":
          verifyToken(data);
          break;
      case "addEmployeeToAuthDb":
        addEmployeeToAuthDb(data);
          break;
      case "updateAuthEmail":
        updateAuthEmail(data);
          break;

       
  }
}
});
