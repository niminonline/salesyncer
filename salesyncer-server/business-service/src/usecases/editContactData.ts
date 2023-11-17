import { qUpdateContactsDataById } from "../database/repositories/contacts-repo";
import logger from "../services/winston";
const editContactData = async (newContactData: any) => {
  try {
    if (newContactData) {
      const { _id } = newContactData;
      const dataToUpdate = {
        name: newContactData.name,
        branch: newContactData.branch,
        email: newContactData.email,
        phone: newContactData.phone,
        profession: newContactData.profession,
        address: newContactData.address,
        place: newContactData.place,
        pincode: newContactData.pincode,
        type: newContactData.type,
        language: newContactData.language,
      };

      const updateResponse = await qUpdateContactsDataById(_id, dataToUpdate);
      if (updateResponse) {
        return { status: "OK", message: "Contact updated successfully" };
      } else {
        return { status: "FAILED", message: "Contact updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default editContactData;
