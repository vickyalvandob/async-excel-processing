import { Router } from "express";
import authRoutes from "./auth.route";
import exampleRoutes from "./Example";

const router = Router();
router.use("/api", authRoutes);
router.use("/api", exampleRoutes);

export default router;
