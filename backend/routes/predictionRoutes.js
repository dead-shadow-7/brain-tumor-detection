import express from "express";
import {
  predictTumor,
  healthCheck,
} from "../controllers/predictionController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/predict", upload.single("image"), predictTumor);
router.get("/health", healthCheck);
router.get("/", (req, res) => {
  res.send("OK");
});

export default router;
