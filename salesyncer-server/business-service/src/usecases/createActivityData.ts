  
  import { qCreateActivityData,qGetActivityCount,qIncActivityCount } from "../database/repositories/activities-repo"
  
  const createActivityData = async (activityData: any) => {
    try {
      const activityCount = await qGetActivityCount();
      if (activityData) {
  
          const newActivityData = {
          activityId: "SSACT0" + activityCount,
          lead:activityData.lead,
          type:activityData.type,
          owner:activityData.owner,
          status:activityData.status,
          scheduledActivity:activityData.scheduledActivity,
          scheduledTime:activityData.scheduledTime,
          feedback:activityData.feedback,
          
        };
  
        const response: any = await qCreateActivityData(newActivityData);
  
        if (response) {
          const updateActivityCount = await qIncActivityCount();
  
          return { status: "OK", message: "Activity created successfully" };
        } else {
          return { status: "FAILED", message: "Activity creation failed" };
        }
      } else {
        return { status: "FAILED", message: "No Activity data found" };
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default createActivityData;
  