import { Router } from "express";
import { login } from "../controllers/rest/auth.controller";

const router = Router();
router.post("/auth/login", login);

export default router;
