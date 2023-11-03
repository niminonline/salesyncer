import BusinessCounter from "../entities/BusinessCounter";
import Activity from "../entities/activity";

////==============================================
export const qGetActivitiesData = async () => {
  try {
    return await Activity.find({})
      .populate({
        path: "lead",
        populate: {
          path: "client",
        },
      })
      .sort({ _id: -1 });
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qCreateActivityData = async (newActivityData: object) => {
  try {
    const newActivity = new Activity(newActivityData);

    const addActivityToDB = await newActivity.save();
    return addActivityToDB;
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qGetActivityDataById = async (_id: string) => {
  try {
    return await Activity.findById(_id).populate({
      path: "lead",
      populate: {
        path: "client",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qUpdateActivityDataById = async (
  _id: string,
  newActivityData: any
) => {
  try {
    console.log("New activity data to update", _id, newActivityData);
    const updateOperation = {
      $set: newActivityData,
    };
    // console.log("Update ops", updateOperation)
    const response = await Activity.findByIdAndUpdate(_id, updateOperation);

    return response;
  } catch (error) {}
};

////==============================================

export const qGetActivityCount = async () => {
  try {
    const counterData: any = await BusinessCounter.findOne();
    // console.log("Counterdata",counterData.activityCounter)
    return counterData.activityCounter;
  } catch (error) {
    console.log(error);
  }
};

////==============================================
////==============================================

export const qIncActivityCount = async () => {
  try {
    const updateCounterData: any = await BusinessCounter.findOneAndUpdate({
      $inc: { activityCounter: 1 },
    });
    return updateCounterData;
  } catch (error) {
    console.log(error);
  }
};

////==============================================
export const qDeleteActivityDataById = async (_id: string) => {
  try {
    return await Activity.findByIdAndRemove(_id);
  } catch (error) {
    console.log(error);
  }
};

////==============================================
