import Contacts from "../entities/contacts";
import BusinessCounter from "../entities/BusinessCounter";

////==============================================
export const qGetContactsData = async () => {
  try {
    return await Contacts.find({});
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qCreateContactData = async (newContactData: object) => {
  try {
    const newContact = new Contacts(newContactData);
   
   const addContactToDB=  await newContact.save();
   return addContactToDB;
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qGetContactsDataById = async (_id: string) => {
  try {
    return await Contacts.findById(_id);
  } catch (error) {
    console.log(error);
  }
};

////==============================================

export const qUpdateContactsDataById = async (
  _id: string,
  newContactData: object
  ) => {
    try {
      console.log("Emp id and data from update repo",_id,newContactData);
      const updateOperation = {
        $set: newContactData,
      };
      // console.log("Update ops", updateOperation)
      const response = await Contacts.findByIdAndUpdate(_id, updateOperation);
      // console.log("Update ops response", response)
      return response;
    } catch (error) {}
  };
  
  ////==============================================
  
  
  export const qGetContactCount = async () => {
    try {
      const counterData:any=  await BusinessCounter.findOne(); 
      // console.log("Counterdata",counterData.contactCounter) 
      return counterData.contactCounter;
    } catch (error) {
      console.log(error);
    }
  };
  
  ////==============================================
  ////==============================================
  
  
  export const qIncContactCount = async () => {
    try {
      const updateCounterData:any=  await BusinessCounter.findOneAndUpdate({$inc:{contactCounter:1}});  
      return updateCounterData;
    } catch (error) {
      console.log(error);
    }
  };
  
  ////==============================================
  export const qDeleteContactDataById = async (_id: string) => {
    try {
      return await Contacts.findByIdAndRemove(_id);
    } catch (error) {
      console.log(error);
    }
  };
  
  ////==============================================