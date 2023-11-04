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
  createProduct,
  editProduct,
  getProduct,
  deleteProduct,
  createSale,
  editSale,
  getSale,
  deleteSale,
  getSales,
  createTarget,
  editTarget,
  getTarget,
  getTargets,
  deleteTarget,
  createActivityType,
  editActivityType,
  deleteActivityType,
  getActivityTypes,

} from "../controllers/controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "API Success" });
});
router.post("/add-branch", addBranch);
router.get("/get-branches", getBranches);

router.get("/get-lead-source", getLeadSource);
router.get("/get-product-category", getProductCategory);
// router.get("/get-products", getProducts);

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


////////////////////////////////////////////////////
router.post("/create-product", createProduct);
router.post("/edit-product", editProduct);
router.get("/get-product", getProduct);
router.get("/get-products", getProducts);
router.delete("/delete-product", deleteProduct);

router.post("/create-sale", createSale);
router.post("/edit-sale", editSale);
router.get("/get-sale", getSale);
router.get("/get-sales", getSales);
router.delete("/delete-sale", deleteSale);

router.post("/create-target", createTarget);
router.post("/edit-target", editTarget);
router.get("/get-target", getTarget);
router.get("/get-targets", getTargets);
router.delete("/delete-target", deleteTarget);


router.post("/create-activity-type", createActivityType);
router.post("/edit-activity-type", editActivityType);
router.get("/get-activity-types", getActivityTypes);
router.delete("/delete-activity-type", deleteActivityType);

export default router;
