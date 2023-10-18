import { Redis } from "ioredis";




export const publishToChannel=(channelName:string,response: any) =>{
    const redisPublisher = new Redis(); 
  
    redisPublisher.publish(
        channelName,
      JSON.stringify(response),
      (error, result) => {
        if (error) {
          console.error("Error publishing data:", error);
        } else {
          console.log("Data published:", result);
        }
  
        redisPublisher.quit();
      }
    );
  }