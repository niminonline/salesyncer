import { Router } from "express";
// import { upload } from "../../middlewares/multer";
// import { verifyToken } from "../../middlewares/auth";
import {
  adminLogin,
  employeeLogin,
  getEmployeeDetails,
  addEmployee,
  getBranches,
  addBranch,
  getEmployeesData,
  updateEmployee,
  getLeaveCategory,
  applyLeave,
  fetchLeaveData,
  leaveRequests,
  leaveAction,
  createContact,
  editContact,
  getContact,
  getContacts,
  deleteContact,
  createLead,
  editLead,
  getLead,
  getLeads,
  deleteLead,
  getLeadSource,
  getProductCategory,
  getProducts,
  createActivity,
  editActivity,
  getActivity,
  getActivities,
  deleteActivity,

} from "../controllers/controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "API Success" });
});
router.post("/add-branch", addBranch);
router.get("/get-branches", getBranches);

router.get("/get-lead-source", getLeadSource);
router.get("/get-product-category", getProductCategory);
router.get("/get-products", getProducts);

router.post("/admin-login", adminLogin);
router.post("/employee-login", employeeLogin);

router.get("/get-employee-data", getEmployeeDetails);
router.get("/get-employees-data", getEmployeesData);
router.post("/add-employee", addEmployee);
router.post("/update-employee", updateEmployee);

router.get("/get-leave-category", getLeaveCategory);
router.post("/apply-leave", applyLeave);
router.post("/fetch-leave-data", fetchLeaveData);
router.get("/leave-requests", leaveRequests);
router.post("/leave-action", leaveAction);

router.post("/create-contact", createContact);
router.post("/edit-contact", editContact);
router.get("/get-contact", getContact);
router.get("/get-contacts", getContacts);
router.delete("/delete-contact", deleteContact);

router.post("/create-lead", createLead);
router.post("/edit-lead", editLead);
router.get("/get-lead", getLead);
router.get("/get-leads", getLeads);
router.delete("/delete-lead", deleteLead);



router.post("/create-activity", createActivity);
router.post("/edit-activity", editActivity);
router.get("/get-activity", getActivity);
router.get("/get-activities", getActivities);
router.delete("/delete-activity", deleteActivity);


export default router;
