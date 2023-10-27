import {
  qCreateContactData,
  qGetContactCount,
  qIncContactCount,
} from "../database/repositories/contacts-repo";

const createContactData = async (contactData: any) => {
  try {
    const contactCount = await qGetContactCount();
    // console.log("contact count",contactCount)
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
      console.log("Response from qaddContactData Q", response);

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
    console.error(err);
  }
};

export default createContactData;
