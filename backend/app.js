import express from "express";
import cors from "cors";
import predictionRoutes from "./routes/predictionRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", predictionRoutes);

// Error handler
app.use(errorHandler);

export default app;
