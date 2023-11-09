import { qUpdateLeadDataById } from "../database/repositories/leads-repo";

const editLeadData = async (newLeadData: any) => {
  try {

    if (newLeadData) {
      const { _id } = newLeadData;
      const dataToUpdate = {
        branch:newLeadData.branch,
        type:newLeadData.type,
        status:newLeadData.status,
        source:newLeadData.source,
        productCategory:newLeadData.productCategory,
        product:newLeadData.product,
        quotedPrice:newLeadData.quotedPrice,
        owner:newLeadData.owner,
        notes:newLeadData.notes,
      };

      const updateResponse = await qUpdateLeadDataById(_id, dataToUpdate);
      if (updateResponse) {
        return { status: "OK", message: "Lead updated successfully" };
      } else {
        return { status: "FAILED", message: "Lead updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No update data found" };
    }
  } catch (err) {
    console.error(err);
  }
};

export default editLeadData;
