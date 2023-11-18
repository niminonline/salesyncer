import { Redis } from "ioredis";
import logger from "./winston";




export const publishToChannel=(channelName:string,response: any) =>{
    const redisPublisher = new Redis({
      host:'redis',
      port: 6379,
    }); 
  
    redisPublisher.publish(
        channelName,
      JSON.stringify(response),
      (error, result) => {
        if (error) {
          logger.error("Error publishing data:", error);
        } else {
           logger.info(`Data published to: ${channelName}`);
        }
  
        redisPublisher.quit();
      }
    );
  }


  export const publishAndResponse = (
    publishChannel: string,
    publishData: any,
    publishAction: string,
    subscribeChannel: string
  ) => {
    const redisPublisher = new Redis({
      host:'redis',
      port: 6379,
    });
    const redisSubscriber = new Redis({
      host: 'redis',
      port: 6379,
    });
  
    return new Promise(async (resolve, reject) => {
      const requestId = Math.random().toString(36).substr(2, 9);
      publishData.requestId = requestId;
      publishData.action = publishAction;
  
      try {
        await redisPublisher.publish(publishChannel, JSON.stringify(publishData));
         logger.info("Message published to", publishChannel);
  
        await redisSubscriber.subscribe(subscribeChannel);
         logger.info("Subscribed to", subscribeChannel);
  
        redisSubscriber.on("message", (channel, message) => {
          const data = JSON.parse(message);
          if (channel === subscribeChannel && data.requestId === requestId) {
            const response = JSON.parse(message);
            redisSubscriber.quit();
  
            resolve(response);
          } else {
             logger.info("Received message on different channel:", channel);
          }
        });
      } catch (error) {
        logger.error("Error publishing message:", error);
        reject(error);
      } finally {
        redisPublisher.quit();
        // redisSubscriber.quit();
      }
    });
  };
  