import { Router } from "express";
import adminController from "../controllers/admin-controller.js";

const adminRouter = Router();

adminRouter.post("/login", adminController.loginAdmin);

export default adminRouter;