import BusinessCounter from "../entities/BusinessCounter";
import Product from "../entities/products";
import ProductCategory from "../entities/productCategory";
import logger from "../../services/winston";

////==============================================
export const qGetProductsData = async () => {
  try {
    return await Product.find({}).sort({ _id: -1 });
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qCreateProductData = async (newProductData: object) => {
  try {
    if (newProductData) {
      const newProduct = new Product(newProductData);

      const addProductToDB = await newProduct.save();
      return addProductToDB;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qGetProductDataById = async (_id: string) => {
  try {
    if (_id) {
      return await Product.findById(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qUpdateProductDataById = async (
  _id: string,
  newProductData: any
) => {
  try {
    if (_id && newProductData) {
      const updateOperation = {
        $set: newProductData,
      };
      const response = await Product.findByIdAndUpdate(_id, updateOperation);

      return response;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {}
};

////==============================================

export const qGetProductCount = async () => {
  try {
    const counterData = await BusinessCounter.findOne();
    if (counterData) return counterData.productCounter;
  } catch (error) {
    logger.error(error);
  }
};

////==============================================
////==============================================

export const qIncProductCount = async () => {
  try {
    const updateProductData: any = await BusinessCounter.findOneAndUpdate({
      $inc: { productCounter: 1 },
    });
    return updateProductData;
  } catch (error) {
    logger.error(error);
  }
};

////==============================================
export const qDeleteProductDataById = async (_id: string) => {
  try {
    if (_id) {
      return await Product.findByIdAndRemove(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

////==============================================

export const qCreateProductCategoryData = async (
  newProductCategoryData: object
) => {
  try {
    if (newProductCategoryData) {
      const newProductCategory = new ProductCategory(newProductCategoryData);

      const addProductCategoryToDB = await newProductCategory.save();
      return addProductCategoryToDB;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qUpdateProductCategoryDataById = async (
  _id: string,
  newProductCategoryData: any
) => {
  try {
    if (_id && newProductCategoryData) {
      const updateOperation = {
        $set: newProductCategoryData,
      };
      const response = await ProductCategory.findByIdAndUpdate(
        _id,
        updateOperation
      );

      return response;
    } else {
      logger.info(`Unable to write to db. Data is missing`);
    }
  } catch (error) {}
};

export const qGetProductCategoryData = async () => {
  try {
    return await ProductCategory.find({});
  } catch (error) {
    logger.error(error);
  }
};

export const qDeleteProductCategoryDataById = async (_id: string) => {
  try {
    if (_id) {
      return await ProductCategory.findByIdAndRemove(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
    logger.error(error);
  }
};

////==============================================
