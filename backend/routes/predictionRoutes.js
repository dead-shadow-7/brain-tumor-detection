import express from "express";
import { root } from "../controllers/rootController.js";
import { predictTumor } from "../controllers/predictionController.js";
import { healthCheck } from "../controllers/healthController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/predict", upload.single("image"), predictTumor);
router.get("/health", healthCheck);
router.get("/", root);

export default router;
