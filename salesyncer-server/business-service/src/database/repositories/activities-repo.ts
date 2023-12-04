import BusinessCounter from "../entities/BusinessCounter";
import Activity from "../entities/activity";
import ActivityType from "../entities/activityType";
import logger from "../../services/winston";

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
    logger.error(error);
  }
};

////==============================================

export const qCreateActivityData = async (newActivityData: object) => {
  try {
    if (newActivityData) {
      const newActivity = new Activity(newActivityData);

      const addActivityToDB = await newActivity.save();
      return addActivityToDB;
    } else {
      logger.info(`Unable to write to db. Activity Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qGetActivityDataById = async (_id: string) => {
  try {
    if (_id) {
      return await Activity.findById(_id).populate({
        path: "lead",
        populate: {
          path: "client",
        },
      });
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qUpdateActivityDataById = async (
  _id: string,
  newActivityData: any
) => {
  try {
    if (_id && newActivityData) {
      const updateOperation = {
        $set: newActivityData,
      };
      const response = await Activity.findByIdAndUpdate(_id, updateOperation);

      return response;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {}
};

////==============================================

export const qGetActivityCount = async () => {
  try {
    const counterData = await BusinessCounter.findOne();
    if(counterData!==null)
    return counterData.activityCounter;
  } catch (error) {
    logger.error(error);
  }
};

////==============================================
////==============================================

export const qIncActivityCount = async () => {
  try {
    const updateCounterData = await BusinessCounter.findOneAndUpdate({
      $inc: { activityCounter: 1 },
    });
    return updateCounterData;
  } catch (error) {
    logger.error(error);
  }
};

////==============================================
export const qDeleteActivityDataById = async (_id: string) => {
  try {
    if (_id !==null) {
      return await Activity.findByIdAndRemove(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

///==============================================
export const qGetActivityTypesData = async () => {
  try {
    return await ActivityType.find({});
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qCreateActivityTypeData = async (newActivityTypeData: object) => {
  try {
    if (newActivityTypeData) {
      const newActivityType = new ActivityType(newActivityTypeData);

      const addActivityTypeToDB = await newActivityType.save();
      return addActivityTypeToDB;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qUpdateActivityTypeDataById = async (
  _id: string,
  newActivityTypeData: any
) => {
  try {
    if (_id && newActivityTypeData) {
      const updateOperation = {
        $set: newActivityTypeData,
      };
      const response = await ActivityType.findByIdAndUpdate(
        _id,
        updateOperation
      );

      return response;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {}
};

////==============================================

export const qDeleteActivityTypeDataById = async (_id: string) => {
  try {

    if(_id){

      return await ActivityType.findByIdAndRemove(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qIsTimeCollisionExists = async (
  ownerInput: string,
  scheduledTimeInput: Date
) => {
  try {
    if(ownerInput && scheduledTimeInput){

      
      return await Activity.find({
        $and: [
          { owner: ownerInput },
          {
            scheduledTime: {
              $gte: new Date(scheduledTimeInput).getTime() - 10 * 60 * 1000,
              $lte: new Date(scheduledTimeInput).getTime() + 10 * 60 * 1000,
            },
          },
        ],
      });
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};
