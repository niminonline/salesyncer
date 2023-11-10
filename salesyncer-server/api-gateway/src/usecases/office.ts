import { publishAndResponse } from "../services/RedisOps";
import service from "../constants/services";
import {
    getEmployeeDataChannel,
    addEmployeeDataChannel,
    getBranchDetailsChannel,
    addBranchDetailsChannel,
    editBranchDetailsChannel,
    getEmployeesDetailsChannel,
    updateEmployeeDetailsChannel,
    getLeaveCategoryDetailsChannel,
    applyLeaveDetailsChannel,
    fetchLeaveDetailsChannel,
    getLeaveRequestsChannel,
    doLeaveActionChannel,
    cancelLeaveDetailsChannel,
    createTargetDetailsChannel,
    editTargetDetailsChannel,
    getTargetDetailsChannel,
    getTargetsDetailsChannel,
    deleteTargetDetailsChannel,
    setBranchTargetDetailsChannel
  } from '../constants/office-channels'


export const getEmployeeData = async(data:object)=>{

    return await publishAndResponse(service.office, data, getEmployeeDataChannel.send, getEmployeeDataChannel.listen);
}
export const addEmployeeData = async(data:object)=>{
    
    return await publishAndResponse(service.office, data,addEmployeeDataChannel.send,addEmployeeDataChannel.listen);
}
export const getBranchDetails = async()=>{
    const data={};
    return await publishAndResponse(service.office, data, getBranchDetailsChannel.send,getBranchDetailsChannel.listen);
}
export const addBranchDetails = async(data:object)=>{
    return await publishAndResponse(service.office, data, addBranchDetailsChannel.send,addBranchDetailsChannel.listen);
}
export const editBranchDetails = async(data:object)=>{
    return await publishAndResponse(service.office, data, editBranchDetailsChannel.send,addBranchDetailsChannel.listen);
}
export const getEmployeesDetails = async()=>{
    const data={};
    
    return await publishAndResponse(service.office, data, getEmployeesDetailsChannel.send, getEmployeesDetailsChannel.listen);
}
export const updateEmployeeDetails = async(data:object)=>{
    
    return await publishAndResponse(service.office, data, updateEmployeeDetailsChannel.send, updateEmployeeDetailsChannel.listen);
}
export const getLeaveCategoryDetails = async()=>{
    const data={};
    return await publishAndResponse(service.office, data, getLeaveCategoryDetailsChannel.send, getLeaveCategoryDetailsChannel.listen);
}


export const applyLeaveDetails = async(data:object)=>{
    
    return await publishAndResponse(service.office, data, applyLeaveDetailsChannel.send, applyLeaveDetailsChannel.listen);
}
export const fetchLeaveDetails = async(data:object)=>{
    return await publishAndResponse(service.office, data, fetchLeaveDetailsChannel.send, fetchLeaveDetailsChannel.listen);
}
export const getLeaveRequests = async()=>{
    const data={};
    return await publishAndResponse(service.office, data, getLeaveRequestsChannel.send, getLeaveRequestsChannel.listen);
}
export const doLeaveAction = async(data:object)=>{
    
    return await publishAndResponse(service.office, data, doLeaveActionChannel.send, doLeaveActionChannel.listen);
}
export const cancelLeaveDetails = async(data:object)=>{
    
    return await publishAndResponse(service.office, data, cancelLeaveDetailsChannel.send, cancelLeaveDetailsChannel.listen);
}

//==========================================Target========================================================
export const createTargetDetails = async (data: object) => {
    return await publishAndResponse(
      service.office,
      data,
      createTargetDetailsChannel.send,
      createTargetDetailsChannel.listen
    );
  };
  export const setBranchTargetDetails = async (data: object) => {
    return await publishAndResponse(
      service.office,
      data,
      setBranchTargetDetailsChannel.send,
      setBranchTargetDetailsChannel.listen
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
  
  export const deleteTargetDetails = async (data: object) => {
    return await publishAndResponse(
      service.business,
      data,
      deleteTargetDetailsChannel.send,
      deleteTargetDetailsChannel.listen
    );
  };
  //=================================================================================================================