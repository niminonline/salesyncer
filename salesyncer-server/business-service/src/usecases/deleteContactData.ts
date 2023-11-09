import { qDeleteContactDataById } from "../database/repositories/contacts-repo";

const deleteContactData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteContactData = await qDeleteContactDataById(_id);
      if (deleteContactData) {
        return {
            deleteContactData,
          message: "Contact deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "Contact deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default deleteContactData;
