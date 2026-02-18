import { me } from "../controllers/auth-controller.js";
import Router from "express";

const authRouter = Router();

authRouter.get("/me", me);

export default authRouter;