import { Router } from "express";
import adminController from "../controllers/admin-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import { verifyRole } from "../middleware/role-middleware.js";

const adminRouter = Router();

adminRouter.post("/loginAdmin", adminController.loginAdmin);
adminRouter.get("/dashboardAdmin", verifyToken, verifyRole("admin"), adminController.dashboardAdmin);

export default adminRouter;