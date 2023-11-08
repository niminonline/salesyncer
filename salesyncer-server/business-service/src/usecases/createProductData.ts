  
  import { qCreateProductData,qGetProductCount,qIncProductCount,qGetProductsData } from "../database/repositories/products-repo"
  
  const createProductData = async (productData: any) => {
    try { 
        const allProductsData:any= await qGetProductsData();
        for (const product of allProductsData) {
          console.log("Existing product name=", product.name.toLowerCase().trim());
          console.log("New product name=", productData.name.toLowerCase().trim());
        
          if ((product.name.toLowerCase().replace(/\s/g, "").trim() === productData.name.toLowerCase().replace(/\s/g, "").trim()) && (product.category==productData.category)) {
            console.log("If satisfies");
            return { status: "FAILED", message: "Product already exists" };
          }
        }



      const productCount = await qGetProductCount();
      console.log("Product count",productCount)
      if (productData) {
  
          const newProductData = {
            productId: "SSPD0" + productCount,
            name:productData.name,
          category:productData.category,
          status:productData.status,
          mrp:productData.mrp,
          lsp:productData.lsp,
          
        };
  
        const response: any = await qCreateProductData(newProductData);
        console.log("Response from qProductData Q", response);
  
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
      console.error(err);
    }
  };
  
  export default createProductData;
  