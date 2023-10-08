import { Router } from "express";
// import { upload } from "../../middlewares/multer";
// import { verifyToken } from "../../middlewares/auth";
import { adminLogin,employeeLogin } from "../controllers/controller";

const router = Router();

router.get("/", (req, res) => {
  res.json({ status: "API Success" });
});
router.post("/admin-login", adminLogin);
router.post("/employee-login", employeeLogin);

export default router;
