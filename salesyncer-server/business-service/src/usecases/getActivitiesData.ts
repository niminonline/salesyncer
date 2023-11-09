import { qGetActivitiesData } from "../database/repositories/activities-repo";

const getActivitiesData = async (): Promise<object | undefined> => {
  try {
    const activitiesData = await qGetActivitiesData();
    if (activitiesData) {
      return {
        activitiesData,
        message: "Activites data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Activites data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getActivitiesData;
