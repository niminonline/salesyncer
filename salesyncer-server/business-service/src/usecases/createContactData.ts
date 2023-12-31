import {
  qCreateContactData,
  qGetContactCount,
  qIncContactCount,
} from "../database/repositories/contacts-repo";
import logger from "../services/winston";

const createContactData = async (contactData: any) => {
  try {
    const contactCount = await qGetContactCount();
    if (contactData) {
      const newContactData = {
        contactId: "SSCNT0" + contactCount,
        name: contactData.name,
        branch: contactData.branch,
        email: contactData.email,
        phone: contactData.phone,
        profession: contactData.profession,
        address: contactData.address,
        place: contactData.place,
        pincode: contactData.pincode,
        type: contactData.type,
        language: contactData.language,
      };

      const response: any = await qCreateContactData(newContactData);

      if (response) {
        const updateContactCount = await qIncContactCount();

        return { status: "OK", message: "Contact created successfully" };
      } else {
        return { status: "FAILED", message: "Contact creation failed" };
      }
    } else {
      return { status: "FAILED", message: "No Contact data failed" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default createContactData;
