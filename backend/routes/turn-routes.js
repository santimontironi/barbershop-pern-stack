import turnController from "../controllers/turn-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import { verifyRole } from "../middleware/role-middleware.js";
import { Router } from "express";

const router = Router();

router.get("/userTurns", verifyToken, verifyRole("user"), turnController.getAllUserTurns);
router.get("/nextTurn", verifyToken, verifyRole("user"), turnController.userNextTurn);
router.get("/adminTurns", verifyToken, verifyRole("admin"), turnController.getAllAdminTurns);

export default router;