import {
  qCreateProductData,
  qGetProductCount,
  qIncProductCount,
  qGetProductsData,
} from "../database/repositories/products-repo";
import logger from "../services/winston";
const createProductData = async (productData: any) => {
  try {
    const allProductsData: any = await qGetProductsData();
    for (const product of allProductsData) {
      if (
        product.name.toLowerCase().replace(/\s/g, "").trim() ===
          productData.name.toLowerCase().replace(/\s/g, "").trim() &&
        product.category == productData.category
      ) {
        return { status: "FAILED", message: "Product already exists" };
      }
    }

    const productCount = await qGetProductCount();
    if (productData) {
      const newProductData = {
        productId: "SSPD0" + productCount,
        name: productData.name,
        category: productData.category,
        status: productData.status,
        mrp: productData.mrp,
        lsp: productData.lsp,
      };

      const response: any = await qCreateProductData(newProductData);

      if (response) {
        const updateProductCount = await qIncProductCount();

        return { status: "OK", message: "Product created successfully" };
      } else {
        return { status: "FAILED", message: "Product creation failed" };
      }
    } else {
      return { status: "FAILED", message: "No Product data found" };
    }
  } catch (err) {
    logger.error(err);
  }
};

export default createProductData;
