import BusinessCounter from "../entities/BusinessCounter";
import Sale from "../entities/sales";

////==============================================
export const qGetSalesData = async () => {
  try {
    return await Sale.find({}).populate({
      path: "lead",
      populate: {
        path: "client",
      },
    }).sort({ _id: -1 });
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qCreateSaleData = async (newSaleData: object) => {
  try {
    const newSale = new Sale(newSaleData);

    const addSaleToDB = await newSale.save();
    return addSaleToDB;
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qGetSaleDataById = async (_id: string) => {
  try {
    return await Sale.findById(_id).populate({
      path: "lead",
      populate: {
        path: "client",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qUpdateSaleDataById = async (
  _id: string,
  newSaleData: any
) => {
  try {
    const updateOperation = {
      $set: newSaleData,
    };
    const response = await Sale.findByIdAndUpdate(_id, updateOperation);

    return response;
  } catch (error) {}
};

////==============================================

export const qGetSaleCount = async () => {
  try {
    const counterData: any = await BusinessCounter.findOne();
    return counterData.saleCounter;
  } catch (error) {
    console.log(error);
  }
};

////==============================================
////==============================================

export const qIncSaleCount = async () => {
  try {
    const updateSaleData: any = await BusinessCounter.findOneAndUpdate({
      $inc: { saleCounter: 1 },
    });
    return updateSaleData;
  } catch (error) {
    console.log(error);
  }
};

////==============================================
export const qDeleteSaleDataById = async (_id: string) => {
  try {
    return await Sale.findByIdAndRemove(_id);
  } catch (error) {
    console.log(error);
  }
};

////==============================================
