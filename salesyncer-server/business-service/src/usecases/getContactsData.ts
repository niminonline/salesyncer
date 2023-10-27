import { qGetContactsData } from "../database/repositories/contacts-repo";

const getContactsData = async (): Promise<object | undefined> => {
  try {
    const contactsData = await qGetContactsData();
    console.log("Contact data from Q", contactsData);
    if (contactsData) {
      return {
        contactsData,
        message: "Contact data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Contact data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getContactsData;
