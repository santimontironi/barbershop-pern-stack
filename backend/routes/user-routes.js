import userController from "../controllers/user-controller.js";
import { Router } from "express";
import { verifyToken } from "../middleware/auth-middleware.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/logout", userController.logoutUser);
router.post("/loginUser", userController.loginUser);
router.post("/registerUser", upload.single("photo"), userController.registerUser);

router.get("/confirmRegister/:token", userController.confirmRegistration);
router.get("/dashboardUser", verifyToken, userController.dashboardUser);
router.patch("/updateUser", verifyToken, upload.single("photo"), userController.updateUser);

export default router;
