import { Redis } from "ioredis";




export const publishToChannel=(channelName:string,data: any,action?:string) =>{
  const redisPublisher = new Redis(); 
  if(action){
    data.action= action;
  }
  // console.log("Data from Auth publish channel ",data)
    redisPublisher.publish(
        channelName,
      JSON.stringify(data),
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