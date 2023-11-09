import { qDeleteProductCategoryDataById } from "../database/repositories/products-repo";

const deleteProductCategoryData = async (_id: string): Promise<object | undefined> => {
  try {
    if (_id) {
      const deleteProductCategoryData = await qDeleteProductCategoryDataById(_id);
      if (deleteProductCategoryData) {
        return {
            deleteProductCategoryData,
          message: "ProductCategory deleted successfully",
          status: "OK",
        };
      } else {
        return { message: "ProductCategory deletion failed", status: "FAILED" };
      }
    } else {
      return { message: "Missing _id", status: "FAILED" };
    }
  } catch (err) {
    console.error(err);
  }
};
export default deleteProductCategoryData;
