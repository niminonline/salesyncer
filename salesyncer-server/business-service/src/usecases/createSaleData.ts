  
  import { qCreateSaleData,qGetSaleCount,qIncSaleCount } from "../database/repositories/sales-repo"
  
  const createSaleData = async (saleData: any) => {
    try {
      const saleCount = await qGetSaleCount();
      console.log("Sale count",saleCount)
      if (saleData) {
  
          const newSaleData = {
            saleId: "SSSL0" + saleCount,
            date:saleData.date,
            invoiceNumber:saleData.invoiceNumber,
            lead:saleData.lead,
            branchName:saleData.branchName,
            employeeName:saleData.employeeName,
            amount:saleData.amount,
            productName:saleData.productName,
            productCategory:saleData.productCategory,
            quantity:saleData.quantity,
            price:saleData.price,
          
        };
  
        const response: any = await qCreateSaleData(newSaleData);
        console.log("Response from qSaleData Q", response);
  
        if (response) {
          const updateSaleCount = await qIncSaleCount();
  
          return { status: "OK", message: "Sale created successfully" };
        } else {
          return { status: "FAILED", message: "Sale creation failed" };
        }
      } else {
        return { status: "FAILED", message: "No Sale data found" };
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  export default createSaleData;
  