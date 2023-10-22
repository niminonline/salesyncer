import { Router } from "express";
// import { upload } from "../../middlewares/multer";
// import { verifyToken } from "../../middlewares/auth";
import { adminLogin,employeeLogin,getEmployeeDetails,addEmployee,getBranches,addBranch } from "../controllers/controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "API Success" });
});
router.post("/admin-login", adminLogin);
router.post("/employee-login", employeeLogin);
router.get("/get-employee-data", getEmployeeDetails);
router.post("/add-employee", addEmployee);
router.get("/get-branches", getBranches);
router.post("/add-branch", addBranch);


export default router;
