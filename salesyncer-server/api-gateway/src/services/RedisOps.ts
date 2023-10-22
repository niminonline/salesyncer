import { Redis } from "ioredis";

export const publishAndResponse = (
  publishChannel: string,
  publishData: any,
  publishAction: string,
  subscribeChannel: string
) => {
  const redisPublisher = new Redis();
  const redisSubscriber = new Redis();

  return new Promise(async (resolve, reject) => {
    const requestId = Math.random().toString(36).substr(2, 9);
    publishData.requestId = requestId;
    publishData.action = publishAction;

    try {
      await redisPublisher.publish(publishChannel, JSON.stringify(publishData));
      console.log("Message published to", publishChannel);

      await redisSubscriber.subscribe(subscribeChannel);
      console.log("Subscribed to", subscribeChannel);

      redisSubscriber.on("message", (channel, message) => {
        const data = JSON.parse(message);
        if (channel === subscribeChannel && data.requestId === requestId) {
          const response = JSON.parse(message);
          redisSubscriber.quit();
          // console.log("Received message:", response);

          resolve(response);
        } else {
          console.log("Received message on different channel:", channel);
        }
      });
    } catch (error) {
      console.error("Error publishing message:", error);
      reject(error);
    } finally {
      redisPublisher.quit();
      // redisSubscriber.quit();
    }
  });
};
