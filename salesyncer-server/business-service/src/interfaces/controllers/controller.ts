import { publishToChannel } from "../../services/redisOps";
import createContactData from "../../usecases/createContactData";
import editContactData from "../../usecases/editContactData";
import getContactData from "../../usecases/getContactData";
import getContactsData from "../../usecases/getContactsData";

export const createContactDetails = async (data: any) => {
  try {
    // console.log("Req body of getEmployeeDetails Controller", data);
    const { requestId, action } = data;
    // console.log("email of getEmployeeDetails Controller", email);

    const response: any = await createContactData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
    }

    console.log("myresponse", response);
    publishToChannel("ApiRes-createContactDetails", response);
  } catch (error) {
    console.error(error);
  }
};
export const editContactDetails = async (data: any) => {
  try {
    // console.log("Req body of getEmployeeDetails Controller", data);
    const { requestId, action } = data;
    // console.log("email of getEmployeeDetails Controller", email);

    const response: any = await editContactData(data);

    if (response) {
      response.requestId = requestId;
      response.action = action;
    }

    // console.log("myresponse", response);
    publishToChannel("ApiRes-editContactDetails", response);
  } catch (error) {
    console.error(error);
  }
};

export const getContactDetails = async (data: any) => {
  try {
    const { _id, requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getContactData(_id);
    if (response.status == "OK") {
      const data = {
        contactData: response.contactData,
        requestId,
        action,
        status: "OK",
        message: "Contact data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getContactDetails", data);
    } else {
      publishToChannel("ApiRes-getContactDetails", {
        requestId,
        action,
        status: "FAILED",
        message: "No response ",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getContactsDetails = async (data: any) => {
  try {
    const { requestId, action } = data;
    // console.log("Request id, action from office controller", requestId, action);
    const response: any = await getContactsData();
    if (response.status == "OK") {
      const data = {
        contactsData: response.contactsData,
        requestId,
        action,
        status: "OK",
        message: "Contacts data fetched successfully",
      };
      // console.log("fetched employees data", data);
      publishToChannel("ApiRes-getContactsDetails", data);
    } else {
      publishToChannel("ApiRes-getContactsDetails", {
        requestId,
        action,
        status: "FAILED",
        message: "No response ",
      });
    }
  } catch (error) {
    console.error(error);
  }
};
