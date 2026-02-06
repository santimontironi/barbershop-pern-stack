import userController from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import { Router } from "express";

const router = Router();

router.post("/logout", userController.logoutUser);
router.post("/login", userController.loginUser);
router.post("/registerUser", userController.registerUser);

router.get("/confirm/:token", userController.confirmRegistration);
router.get("/turns", verifyToken, userController.myTurns);


export default router;