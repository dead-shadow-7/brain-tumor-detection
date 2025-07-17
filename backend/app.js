import express from "express";
import cors from "cors";
import predictionRoutes from "./routes/predictionRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import rootRoutes from "./routes/rootRoutes.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/", rootRoutes);
app.use("/api", predictionRoutes);

// Error handler
app.use(errorHandler);

export default app;
