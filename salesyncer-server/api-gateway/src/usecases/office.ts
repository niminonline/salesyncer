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