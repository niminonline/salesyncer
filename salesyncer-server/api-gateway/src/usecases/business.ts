import { publishAndResponse } from "../services/RedisOps";
import service from "../constants/services";


export const getLeadSourceDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getLeadSourceDetails', 'ApiRes-getLeadSourceDetails');
}

export const getProductCategoryDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getProductCategoryDetails', 'ApiRes-getProductCategoryDetails');
}

// export const getProductsDetails = async()=>{
//     const data={};
//     //publishChannel, publishData, publishAction, subscribeChannel
//     return await publishAndResponse(service.business, data, 'getProductsDetails', 'ApiRes-getProductsDetails');
// }


export const createContactDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'createContactDetails', 'ApiRes-createContactDetails');
}
export const editContactDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'editContactDetails', 'ApiRes-editContactDetails');
}
export const getContactDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'getContactDetails', 'ApiRes-getContactDetails');
}
export const getContactsDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getContactsDetails', 'ApiRes-getContactsDetails');
}
export const deleteContactDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'deleteContactDetails', 'ApiRes-deleteContactDetails');
}

//==========================================Leads========================================================
export const createLeadDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'createLeadDetails', 'ApiRes-createLeadDetails');
}
export const editLeadDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'editLeadDetails', 'ApiRes-editLeadDetails');
}
export const getLeadDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'getLeadDetails', 'ApiRes-getLeadDetails');
}
export const getLeadsDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getLeadsDetails', 'ApiRes-getLeadsDetails');
}
export const deleteLeadDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'deleteLeadDetails', 'ApiRes-deleteLeadDetails');
}



//==========================================Activity========================================================
export const createActivityDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'createActivityDetails', 'ApiRes-createActivityDetails');
}
export const editActivityDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'editActivityDetails', 'ApiRes-editActivityDetails');
}
export const getActivityDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'getActivityDetails', 'ApiRes-getActivityDetails');
}
export const getActivitiesDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getActivitiesDetails', 'ApiRes-getActivitiesDetails');
}
export const deleteActivityDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'deleteActivityDetails', 'ApiRes-deleteActivityDetails');
}
//=================================================================================================================



//==========================================Products========================================================
export const createProductDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'createProductDetails', 'ApiRes-createProductDetails');
}
export const editProductDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'editProductDetails', 'ApiRes-editProductDetails');
}
export const getProductDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'getProductDetails', 'ApiRes-getProductDetails');
}
export const getProductsDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getProductsDetails', 'ApiRes-getProductsDetails');
}
export const deleteProductDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'deleteProductDetails', 'ApiRes-deleteProductDetails');
}
//=================================================================================================================


//==========================================Sales========================================================
export const createSaleDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'createSaleDetails', 'ApiRes-createSaleDetails');
}
export const editSaleDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'editSaleDetails', 'ApiRes-editSaleDetails');
}
export const getSaleDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'getSaleDetails', 'ApiRes-getSaleDetails');
}
export const getSalesDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getSalesDetails', 'ApiRes-getSalesDetails');
}
export const deleteSaleDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'deleteSaleDetails', 'ApiRes-deleteSaleDetails');
}
//=================================================================================================================



//==========================================Target========================================================
export const createTargetDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'createTargetDetails', 'ApiRes-createTargetDetails');
}
export const editTargetDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'editTargetDetails', 'ApiRes-editTargetDetails');
}
export const getTargetDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'getTargetDetails', 'ApiRes-getTargetDetails');
}
export const getTargetsDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getTargetsDetails', 'ApiRes-getTargetsDetails');
}
export const deleteTargetDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'deleteTargetDetails', 'ApiRes-deleteTargetDetails');
}
//=================================================================================================================


//==========================================Activity Type========================================================
export const createActivityTypeDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'createActivityTypeDetails', 'ApiRes-createActivityTypeDetails');
}
export const editActivityTypeDetails = async(data:object)=>{

    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'editActivityTypeDetails', 'ApiRes-editActivityTypeDetails');
}
export const getActivityTypesDetails = async()=>{
    const data={};
    //publishChannel, publishData, publishAction, subscribeChannel
    return await publishAndResponse(service.business, data, 'getActivityTypesDetails', 'ApiRes-getActivityTypesDetails');
}
export const deleteActivityTypeDetails = async(data:object)=>{
   
    //publishChannel, publishData, publishAction, subscribeChannel
return await publishAndResponse(service.business, data, 'deleteActivityTypeDetails', 'ApiRes-deleteActivityTypeDetails');
}
//=================================================================================================================

