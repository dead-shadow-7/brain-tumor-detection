import express from "express";
import { predictTumor } from "../controllers/predictionController.js";
import { healthCheck } from "../controllers/healthController.js";
import { upload } from "../middlewares/upload.js";
import { sendMessage } from "../controllers/messageController.js";
import multer from "multer";
const formParser = multer().none(); // for parsing multipart/form-data without files

const router = express.Router();

router.post("/predict", upload.single("image"), predictTumor);
router.get("/health", healthCheck);
router.post("/contact", formParser, sendMessage);

export default router;
