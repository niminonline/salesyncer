import { qUpdateSaleDataById } from "../database/repositories/sales-repo";

const editSaleData = async (newSaleData: any) => {
  try {
    // console.log("New Product data from business service", newActivityData);

    if (newSaleData) {
      const { _id } = newSaleData;
      const dataToUpdate = {
        invoiceNumber: newSaleData.invoiceNumber,
        lead: newSaleData.lead,
        date: newSaleData.date,
        branchName: newSaleData.branchName,
        employeeName: newSaleData.employeeName,
        amount: newSaleData.amount,
        productName: newSaleData.productName,
        productCategory: newSaleData.productCategory,
        quantity: newSaleData.quantity,
        price: newSaleData.price,
      };

      const updateResponse = await qUpdateSaleDataById(_id, dataToUpdate);
      if (updateResponse) {
        return { status: "OK", message: "Sale updated successfully" };
      } else {
        return { status: "FAILED", message: "Sale updation Failed" };
      }
    } else {
      return { status: "FAILED", message: "No Sale update data found" };
    }
  } catch (err) {
    console.error(err);
  }
};

export default editSaleData;
