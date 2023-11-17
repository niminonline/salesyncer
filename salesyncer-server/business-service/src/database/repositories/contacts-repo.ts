import Contacts from "../entities/contacts";
import BusinessCounter from "../entities/BusinessCounter";
import logger from "../../services/winston";

////==============================================
export const qGetContactsData = async () => {
  try {
    return await Contacts.find({});
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qCreateContactData = async (newContactData: object) => {
  try {
    const newContact = new Contacts(newContactData);
   
   const addContactToDB=  await newContact.save();
   return addContactToDB;
  } catch (error) {
    logger.error(error);
  }
};

////==============================================

export const qGetContactsDataById = async (_id: string) => {
  try {
    return await Contacts.findById(_id);
  } catch (error) {
     logger.error(error);
  }
};

////==============================================

export const qUpdateContactsDataById = async (
  _id: string,
  newContactData: object
  ) => {
    try {
      const updateOperation = {
        $set: newContactData,
      };
      const response = await Contacts.findByIdAndUpdate(_id, updateOperation);
      return response;
    } catch (error) {}
  };
  
  ////==============================================
  
  
  export const qGetContactCount = async () => {
    try {
      const counterData:any=  await BusinessCounter.findOne(); 
      return counterData.contactCounter;
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================
  ////==============================================
  
  
  export const qIncContactCount = async () => {
    try {
      const updateCounterData:any=  await BusinessCounter.findOneAndUpdate({$inc:{contactCounter:1}});  
      return updateCounterData;
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================
  export const qDeleteContactDataById = async (_id: string) => {
    try {
      return await Contacts.findByIdAndRemove(_id);
    } catch (error) {
       logger.error(error);
    }
  };
  
  ////==============================================