import { publishAndResponse } from "../services/RedisOps";
import service from "../constants/services";
import {
  getLeadSourceDetailsChannel,
  getProductCategoryDetailsChannel,
  createContactDetailsChannel,
  editContactDetailsChannel,
  getContactDetailsChannel,
  getContactsDetailsChannel,
  deleteContactDetailsChannel,
  createLeadDetailsChannel,
  editLeadDetailsChannel,
  getLeadDetailsChannel,
  getLeadsDetailsChannel,
  deleteLeadDetailsChannel,
  createActivityDetailsChannel,
  editActivityDetailsChannel,
  getActivityDetailsChannel,
  getActivitiesDetailsChannel,
  deleteActivityDetailsChannel,
  createProductDetailsChannel,
  editProductDetailsChannel,
  getProductDetailsChannel,
  getProductsDetailsChannel,
  deleteProductDetailsChannel,
  createSaleDetailsChannel,
  editSaleDetailsChannel,
  getSaleDetailsChannel,
  getSalesDetailsChannel,
  deleteSaleDetailsChannel,
  createTargetDetailsChannel,
  editTargetDetailsChannel,
  getTargetDetailsChannel,
  getTargetsDetailsChannel,
  deleteTargetDetailsChannel,
  createActivityTypeDetailsChannel,
  editActivityTypeDetailsChannel,
  getActivityTypesDetailsChannel,
  deleteActivityTypeDetailsChannel,
} from "../constants/business-channels";


export const getLeadSourceDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
   getLeadSourceDetailsChannel.send,
   getLeadSourceDetailsChannel.listen
  );
};

export const getProductCategoryDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
   getProductCategoryDetailsChannel.send,
   getProductCategoryDetailsChannel.listen
  );
};

// export const getProductsDetails = async()=>{
//     const data={};
//
//     return await publishAndResponse(service.business, data, 'getProductsDetails', 'ApiRes-getProductsDetails');
// }

export const createContactDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
    createContactDetailsChannel.send,
   createContactDetailsChannel.listen
  );
};
export const editContactDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   editContactDetailsChannel.send,
   editContactDetailsChannel.listen
  );
};
export const getContactDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
  getContactDetailsChannel.send,
   getContactDetailsChannel.listen
  );
};
export const getContactsDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
  getContactsDetailsChannel.send,
   getContactsDetailsChannel.listen
  );
};
export const deleteContactDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   deleteContactDetailsChannel.send,
   deleteContactDetailsChannel.listen
  );
};

//==========================================Leads========================================================
export const createLeadDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   createLeadDetailsChannel.send,
   createLeadDetailsChannel.listen
  );
};
export const editLeadDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   editLeadDetailsChannel.send,
   editLeadDetailsChannel.listen
  );
};
export const getLeadDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   getLeadDetailsChannel.send,
   getLeadDetailsChannel.listen
  );
};
export const getLeadsDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
   getLeadsDetailsChannel.send,
   getLeadsDetailsChannel.listen
  );
};
export const deleteLeadDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   deleteLeadDetailsChannel.send,
   deleteLeadDetailsChannel.listen
  );
};

//==========================================Activity========================================================
export const createActivityDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
    createActivityDetailsChannel.send,
   createActivityDetailsChannel.listen
  );
};
export const editActivityDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   editActivityDetailsChannel.send,
   editActivityDetailsChannel.listen
  );
};
export const getActivityDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
  getActivityDetailsChannel.send,
    getActivityDetailsChannel.listen
  );
};
export const getActivitiesDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
  getActivitiesDetailsChannel.send,
   getActivitiesDetailsChannel.listen
  );
};
export const deleteActivityDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   deleteActivityDetailsChannel.send,
   deleteActivityDetailsChannel.listen
  );
};
//=================================================================================================================

//==========================================Products========================================================
export const createProductDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
    createProductDetailsChannel.send,
   createProductDetailsChannel.listen
  );
};
export const editProductDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
  editProductDetailsChannel.send,
   editProductDetailsChannel.listen
  );
};
export const getProductDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   getProductDetailsChannel.send,
   getProductDetailsChannel.listen
  );
};
export const getProductsDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
  getProductsDetailsChannel.send,
getProductsDetailsChannel.listen
  );
};
export const deleteProductDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   deleteProductDetailsChannel.send,
    deleteProductDetailsChannel.listen
  );
};
//=================================================================================================================

//==========================================Sales========================================================
export const createSaleDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
  createSaleDetailsChannel.send,
   createSaleDetailsChannel.listen
  );
};
export const editSaleDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   editSaleDetailsChannel.send,
   editSaleDetailsChannel.listen
  );
};
export const getSaleDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
 getSaleDetailsChannel.send,
   getSaleDetailsChannel.listen
  );
};
export const getSalesDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
   getSalesDetailsChannel.send,
   getSalesDetailsChannel.listen
  );
};
export const deleteSaleDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
    deleteSaleDetailsChannel.send,
deleteSaleDetailsChannel.listen  );
};
//=================================================================================================================

//==========================================Target========================================================
export const createTargetDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
    createTargetDetailsChannel.send,
   createTargetDetailsChannel.listen
  );
};
export const editTargetDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
  editTargetDetailsChannel.send,
editTargetDetailsChannel.listen
  );
};
export const getTargetDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   getTargetDetailsChannel.send,
   getTargetDetailsChannel.listen
  );
};
export const getTargetsDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
   getTargetsDetailsChannel.send,
   getTargetsDetailsChannel.listen
  );
};
export const deleteTargetDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   deleteTargetDetailsChannel.send,
  deleteTargetDetailsChannel.listen
  );
};
//=================================================================================================================

//==========================================Activity Type========================================================
export const createActivityTypeDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
  createActivityTypeDetailsChannel.send,
  createActivityTypeDetailsChannel.listen
  );
};
export const editActivityTypeDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   editActivityTypeDetailsChannel.send,
   editActivityTypeDetailsChannel.listen
  );
};
export const getActivityTypesDetails = async () => {
  const data = {};

  return await publishAndResponse(
    service.business,
    data,
  getActivityTypesDetailsChannel.send,
   getActivityTypesDetailsChannel.listen
  );
};
export const deleteActivityTypeDetails = async (data: object) => {
  return await publishAndResponse(
    service.business,
    data,
   deleteActivityTypeDetailsChannel.send,
    deleteActivityTypeDetailsChannel.listen
  );
};
//=================================================================================================================
