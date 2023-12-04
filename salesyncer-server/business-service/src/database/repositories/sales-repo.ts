import BusinessCounter from "../entities/BusinessCounter";
import Sale from "../entities/sales";
import logger from "../../services/winston";

////==============================================
export const qGetSalesData = async () => {
  try {
    return await Sale.find({})
      .populate({
        path: "lead",
        populate: {
          path: "client",
        },
      })
      .sort({ _id: -1 });
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qCreateSaleData = async (newSaleData: object) => {
  try {
    if(newSaleData){

      const newSale = new Sale(newSaleData);
      const addSaleToDB = await newSale.save();
      return addSaleToDB;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qGetSaleDataById = async (_id: string) => {
  try {
    if(_id){

      return await Sale.findById(_id).populate({
        path: "lead",
        populate: {
          path: "client",
        },
      });
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qUpdateSaleDataById = async (_id: string, newSaleData: any) => {
  try {
    if(_id && newSaleData){

      const updateOperation = {
        $set: newSaleData,
      };
      const response = await Sale.findByIdAndUpdate(_id, updateOperation);
      
      return response;
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {}
};

////==============================================

export const qGetSaleCount = async () => {
  try {
    
    const counterData = await BusinessCounter.findOne();
    if(counterData)
    return counterData.saleCounter;
  } catch (error) {
     logger.error(error);
  }
};

////==============================================
////==============================================

export const qIncSaleCount = async () => {
  try {
    
    const updateSaleData = await BusinessCounter.findOneAndUpdate({
      $inc: { saleCounter: 1 },
    });
    return updateSaleData;
  } catch (error) {
     logger.error(error);
  }
};

////==============================================
export const qDeleteSaleDataById = async (_id: string) => {
  try {
    if(_id){

      return await Sale.findByIdAndRemove(_id);
    } else {
      logger.info(`Unable to write to db. Data missing`);
    }
  } catch (error) {
     logger.error(error);
  }
};

////==============================================
