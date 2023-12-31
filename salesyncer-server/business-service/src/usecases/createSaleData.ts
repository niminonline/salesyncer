import {
  qCreateSaleData,
  qGetSaleCount,
  qIncSaleCount,
} from "../database/repositories/sales-repo";
import logger from "../services/winston";
import { publishAndResponse } from "../services/redisOps";

const createSaleData = async (saleData: any) => {
  try {
    const saleCount = await qGetSaleCount();
    if (saleData) {
      const newSaleData = {
        saleId: "SSSL0" + saleCount,
        date: saleData.date,
        invoiceNumber: saleData.invoiceNumber,
        lead: saleData.lead,
        branchName: saleData.branchName,
        employeeName: saleData.employeeName,
        amount: saleData.amount,
        productName: saleData.productName,
        productCategory: saleData.productCategory,
        quantity: saleData.quantity,
        price: saleData.price,
      };

      const response: any = await qCreateSaleData(newSaleData);

      if (response) {
        const { employee_id } = saleData;

        const saleDate: Date = new Date(saleData.date);
        const saleMonth = saleDate.toLocaleString("en-us", { month: "long" });
        const saleYear = saleDate.getFullYear();

        const data = {
          _id: employee_id,
          month: saleMonth,
          year: saleYear,
          sale: saleData.amount,
        };
        const updateAchievedTarget = await publishAndResponse(
          "office-service",
          data,
          "updateAchievedTargetDetails",
          "Res-updateAchievedTargetDetails"
        );

        const updateSaleCount = await qIncSaleCount();

        return { status: "OK", message: "Sale created successfully" };
      } else {
        return { status: "FAILED", message: "Sale creation failed" };
      }
    } else {
      return { status: "FAILED", message: "No Sale data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default createSaleData;
