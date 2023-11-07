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

export {
  getEmployeeDataChannel,
  addEmployeeDataChannel,
  getBranchDetailsChannel,
  addBranchDetailsChannel,
  getEmployeesDetailsChannel,
  updateEmployeeDetailsChannel,
  getLeaveCategoryDetailsChannel,
  applyLeaveDetailsChannel,
  fetchLeaveDetailsChannel,
  getLeaveRequestsChannel,
  doLeaveActionChannel,
  cancelLeaveDetailsChannel
};
