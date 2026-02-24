import { me } from "../controllers/auth-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import Router from "express";

const authRouter = Router();

authRouter.get("/me", verifyToken, me);

export default authRouter;