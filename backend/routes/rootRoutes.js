import express from "express";
import { root } from "../controllers/rootController.js";

const router = express.Router();

router.get("/", root);
export default router;
