import { qGetProductCategoryData } from "../database/repositories/leads-repo";

const getProductCategoryData = async (): Promise<object | undefined> => {
  try {
    const productCategoriesData = await qGetProductCategoryData();
    console.log("Product category data from Q", productCategoriesData);
    if (productCategoriesData) {
      return {
        productCategoriesData,
        message: "Product categories  data fetched successfully",
        status: "OK",
      };
    } else {
      return { message: "Product categories data fetching failed", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default getProductCategoryData;
