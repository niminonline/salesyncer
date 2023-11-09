  
  import { qCreateActivityTypeData} from "../database/repositories/activities-repo"
  
  const createActivityTypeData = async (activityTypeData: any) => {
    try {
      if (activityTypeData) {
  
          const newActivityTypeData = {
            activityType: activityTypeData.activityType,
      
          
        };
  
        const response: any = await qCreateActivityTypeData(newActivityTypeData);
  
        if (response) {
        
  
          return { status: "OK", message: "ActivityType created successfully" };
        } else {
          return { status: "FAILED", message: "ActivityType creation failed" };
        }
      } else {
        return { status: "FAILED", message: "No ActivityType data found" };
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default createActivityTypeData;
  