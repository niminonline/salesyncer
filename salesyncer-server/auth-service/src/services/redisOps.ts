import { Redis } from "ioredis";




export const publishToChannel=(channelName:string,response: any) =>{
    const redisPublisher = new Redis(); // Create a new Redis instance for publishing
  
    // Publish the response to the auth-response channel
    redisPublisher.publish(
        channelName,
      JSON.stringify(response),
      (error, result) => {
        if (error) {
          console.error("Error publishing data:", error);
        } else {
          console.log("Data published:", result);
        }
  
        // Close the publisher client after publishing the response
        redisPublisher.quit();
      }
    );
  }