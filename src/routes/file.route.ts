import { Router } from "express";
import multer from "multer";
import { authenticateJWT } from "../middlewares/authJwt";
import { uploadFile, listFiles } from "../controllers/rest/file.controller";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.post("/upload", authenticateJWT, upload.single("file"), uploadFile);
router.get("/files", authenticateJWT, listFiles);

export default router;
