import userController from "../controllers/user-controller.js";
import { Router } from "express";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = Router();

router.post("/logout", userController.logoutUser);
router.post("/loginUser", userController.loginUser);
router.post("/registerUser", userController.registerUser);

router.get("/confirmRegister/:token", userController.confirmRegistration);
router.get("/dashboardUser", verifyToken, userController.dashboardUser);

export default router;
