import turnController from "../controllers/turn-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import { verifyRole } from "../middleware/role-middleware.js";
import { Router } from "express";

const router = Router();

router.get("/userTurns", verifyToken, verifyRole("user"), turnController.getAllUserTurns);
router.get("/activeTurn", verifyToken, verifyRole("user"), turnController.userActiveTurn);
router.get("/adminTurns", verifyToken, verifyRole("admin"), turnController.getAllAdminTurns);
router.get("/allAdminTurns", verifyToken, verifyRole("admin"), turnController.getAllAdminAllTurns);
router.post("/newTurn", verifyToken, verifyRole("user"), turnController.createTurn);
router.patch("/cancelTurnByUser/:turnId", verifyToken, verifyRole("user"), turnController.turnCancelByUser);
router.patch("/cancelTurnByAdmin/:turnId", verifyToken, verifyRole("admin"), turnController.turnCancelByAdmin);

export default router;