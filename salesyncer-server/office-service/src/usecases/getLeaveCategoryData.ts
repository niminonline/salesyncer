import { qGetLeaveCategoryData } from "../database/repositories/employeeRepo";
import logger from "../services/winston";

const getLeaveCategoryData = async (): Promise<object | undefined> => {
  try {
    const categoryData = await qGetLeaveCategoryData();
    if (categoryData) {
      return {
        categoryData,
        message: " Leave category data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Leave category data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default getLeaveCategoryData;
