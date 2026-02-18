import { Router } from "express";
import adminController from "../controllers/admin-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const adminRouter = Router();

adminRouter.post("/loginAdmin", adminController.loginAdmin);
adminRouter.get("/dashboardAdmin", verifyToken, adminController.dashboardAdmin);

export default adminRouter;