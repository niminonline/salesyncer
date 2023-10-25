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
  
} from "../controllers/controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "API Success" });
});
router.post("/admin-login", adminLogin);
router.post("/employee-login", employeeLogin);
router.get("/get-employee-data", getEmployeeDetails);
router.get("/get-employees-data", getEmployeesData);
router.post("/add-employee", addEmployee);
router.get("/get-branches", getBranches);
router.post("/add-branch", addBranch);
router.post("/update-employee", updateEmployee);
router.get("/get-leave-category", getLeaveCategory);
router.post("/apply-leave", applyLeave);

export default router;
