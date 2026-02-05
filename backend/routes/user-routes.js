import userController from "../controllers/user-controller.js";
import { Router } from "express";

const router = Router();

router.post("/registerUser", userController.registerUser);
router.get("/confirm/:token", userController.confirmRegistration);
router.post("/logout", userController.logoutUser);

export default router;