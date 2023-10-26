import { publishAndResponse } from "../services/RedisOps";


export const getEmployeeData = async(data:object)=>{

    return await publishAndResponse('office-service', data, 'getEmployeeData', 'ApiRes-getEmployeeData');
}
export const addEmployeeData = async(data:object)=>{
    
    return await publishAndResponse('office-service', data, 'addEmployeeData', 'ApiRes-addEmployeeData');
}
export const getBranchDetails = async()=>{
    const data={};
    return await publishAndResponse('office-service', data, 'getBranchDetails', 'ApiRes-getBranchDetails');
}
export const addBranchDetails = async(data:object)=>{
    return await publishAndResponse('office-service', data, 'addBranchDetails', 'ApiRes-addBranchDetails');
}
export const getEmployeesDetails = async()=>{
    const data={};
    
    return await publishAndResponse('office-service', data, 'getEmployeesDetails', 'ApiRes-getEmployeesDetails');
}
export const updateEmployeeDetails = async(data:object)=>{
    
    return await publishAndResponse('office-service', data, 'updateEmployeeDetails', 'ApiRes-updateEmployeeDetails');
}
export const getLeaveCategoryDetails = async()=>{
    const data={};
    return await publishAndResponse('office-service', data, 'getLeaveCategoryDetails', 'ApiRes-getLeaveCategoryDetails');
}


export const applyLeaveDetails = async(data:object)=>{
    
    return await publishAndResponse('office-service', data, 'applyLeaveDetails', 'ApiRes-applyLeaveDetails');
}
export const fetchLeaveDetails = async(data:object)=>{
    return await publishAndResponse('office-service', data, 'fetchLeaveDetails', 'ApiRes-fetchLeaveDetails');
}
export const getLeaveRequests = async()=>{
    const data={};
    return await publishAndResponse('office-service', data, 'getLeaveRequests', 'ApiRes-getLeaveRequests');
}
export const doLeaveAction = async(data:object)=>{
    
    return await publishAndResponse('office-service', data, 'doLeaveAction', 'ApiRes-doLeaveAction');
}