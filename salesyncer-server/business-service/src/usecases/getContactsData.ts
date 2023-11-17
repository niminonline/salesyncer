import { qGetContactsData } from "../database/repositories/contacts-repo";
import logger from "../services/winston";

const getContactsData = async (): Promise<object | undefined> => {
  try {
    const contactsData = await qGetContactsData();
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
    logger.error(err);
  }
};
export default getContactsData;
