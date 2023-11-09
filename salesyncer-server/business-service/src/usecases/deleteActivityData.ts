import { qDeleteActivityDataById } from "../database/repositories/activities-repo";

const deleteActivityData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteActivityData = await qDeleteActivityDataById(_id);
      if (deleteActivityData) {
        return {
            deleteActivityData,
          message: "Activity deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "Activity deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default deleteActivityData;
