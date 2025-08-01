import { Router } from "express";
import authRoutes from "./auth.route";
import fileRoutes from "./file.route";

const router = Router();
router.use("/api", authRoutes);
router.use("/api", fileRoutes);

export default router;
