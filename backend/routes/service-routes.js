import { Router } from "express";
import servicesController from "../controllers/services-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";
import { verifyRole } from "../middleware/role-middleware.js";

const router = Router();

router.post("/services", verifyToken, verifyRole("admin"), servicesController.createService);
router.delete("/services/:id", verifyToken, verifyRole("admin"), servicesController.deleteService);
router.get("/services", verifyToken, servicesController.getAllServices);

export default router;