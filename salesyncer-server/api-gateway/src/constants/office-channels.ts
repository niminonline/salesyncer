const getEmployeeDataChannel = {
  send: "getEmployeeData",
  listen: "ApiRes-getEmployeeData",
};
const addEmployeeDataChannel = {
  send: "addEmployeeData",
  listen: "ApiRes-addEmployeeData",
};
const getBranchDetailsChannel = {
  send: "getBranchDetails",
  listen: "ApiRes-getBranchDetails",
};
const addBranchDetailsChannel = {
  send: "addBranchDetails",
  listen: "ApiRes-addBranchDetails",
};
const editBranchDetailsChannel = {
  send: "editBranchDetails",
  listen: "ApiRes-editBranchDetails",
};
const getEmployeesDetailsChannel = {
  send: "getEmployeesDetails",
  listen: "ApiRes-getEmployeesDetails",
};
const updateEmployeeDetailsChannel = {
  send: "updateEmployeeDetails",
  listen: "ApiRes-updateEmployeeDetails",
};
const getLeaveCategoryDetailsChannel = {
  send: "getLeaveCategoryDetails",
  listen: "ApiRes-getLeaveCategoryDetails",
};
const applyLeaveDetailsChannel = {
  send: "applyLeaveDetails",
  listen: "ApiRes-applyLeaveDetails",
};
const fetchLeaveDetailsChannel = {
  send: "fetchLeaveDetails",
  listen: "ApiRes-fetchLeaveDetails",
};
const getLeaveRequestsChannel = {
  send: "getLeaveRequests",
  listen: "ApiRes-getLeaveRequests",
};
const doLeaveActionChannel = {
  send: "doLeaveAction",
  listen: "ApiRes-doLeaveAction",
};
const cancelLeaveDetailsChannel = {
  send: "cancelLeaveDetails",
  listen: "ApiRes-cancelLeaveDetails",
};

const createTargetDetailsChannel = {
  send: "createTargetDetails",
  listen: "ApiRes-createTargetDetails",
};
const setBranchTargetDetailsChannel = {
  send: "setBranchTargetDetails",
  listen: "ApiRes-setBranchTargetDetails",
};
const editTargetDetailsChannel = {
  send: "editTargetDetails",
  listen: "ApiRes-editTargetDetails",
};
const getTargetDetailsChannel = {
  send: "getTargetDetails",
  listen: "ApiRes-getTargetDetails",
};
const getTargetsDetailsChannel = {
  send: "getTargetsDetails",
  listen: "ApiRes-getTargetsDetails",
};
const deleteTargetDetailsChannel = {
  send: "deleteTargetDetails",
  listen: "ApiRes-deleteTargetDetails",
};

export {
  getEmployeeDataChannel,
  addEmployeeDataChannel,
  editBranchDetailsChannel,
  getBranchDetailsChannel,
  addBranchDetailsChannel,
  getEmployeesDetailsChannel,
  updateEmployeeDetailsChannel,
  getLeaveCategoryDetailsChannel,
  applyLeaveDetailsChannel,
  fetchLeaveDetailsChannel,
  getLeaveRequestsChannel,
  doLeaveActionChannel,
  cancelLeaveDetailsChannel,
  createTargetDetailsChannel,
  setBranchTargetDetailsChannel,
  editTargetDetailsChannel,
  getTargetDetailsChannel,
  getTargetsDetailsChannel,
  deleteTargetDetailsChannel,
};
