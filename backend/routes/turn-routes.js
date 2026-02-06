import turnController from "../controllers/turn-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import { Router } from "express";

const router = Router();

router.get("/myTurns", verifyToken, turnController.myTurns);

export default router;