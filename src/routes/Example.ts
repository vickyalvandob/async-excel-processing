import { Router } from "express";
import { authenticateJWT } from "../middlewares/authJwt";

const router = Router();

router.get("/private", authenticateJWT, (req, res) => {
  // @ts-ignore
  res.json({ message: "JWT valid!", user: req.user });
});

export default router;