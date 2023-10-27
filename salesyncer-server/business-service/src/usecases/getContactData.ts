import { qGetContactsDataById } from "../database/repositories/contacts-repo";

const getContactData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const contactData = await qGetContactsDataById(_id);
      // console.log("Employee data from Q", employeeData);
      if (contactData) {
        return {
          contactData,
          message: "Contact details fetched successfully",
          status: "OK",
        };
      } else {
        return { message: "Contact details fetching failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getContactData;
