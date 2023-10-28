import {
  qCreateContactData,
  qGetContactCount,
  qIncContactCount,
} from "../database/repositories/contacts-repo";

import { qCreateLeadsData,qGetLeadsCount,qIncLeadCount } from "../database/repositories/leads-repo";
import moment from 'moment'; 

const createLeadData = async (leadData: any) => {
  try {
    const leadsCount = await qGetLeadsCount();
    console.log("contact count",leadsCount)
    if (leadData) {

      
        const currentDate = moment().format('DD/MM/YYYY hh:mm a');
        const newLeadData = {
        leadId: "SSLD0" + leadsCount,
        branch:leadData.branch,
        type:leadData.type,
        client:leadData.client,
        status:"New",
        source:leadData.source,
        productCategory:leadData.productCategory,
        product:leadData.product,
        quotedPrice:leadData.quotedPrice,
        owner:leadData.owner,
        notes:leadData.notes,
        log: [`${currentDate}: New lead created by ${leadData.owner}`]
        
      };

      const response: any = await qCreateLeadsData(newLeadData);
      console.log("Response from qcreateleads Q", response);

      if (response) {
        const updateContactCount = await qIncLeadCount();

        return { status: "OK", message: "Lead created successfully" };
      } else {
        return { status: "FAILED", message: "Lead creation failed" };
      }
    } else {
      return { status: "FAILED", message: "No Lead data found" };
    }
  } catch (err) {
    console.error(err);
  }
};

export default createLeadData;
