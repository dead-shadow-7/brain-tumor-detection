import app from "./app.js";
import { CONFIG } from "./config/config.js";
import { initializeGradioClient } from "./utils/gradioClient.js";

const startServer = async () => {
  try {
    await initializeGradioClient();
    app.listen(CONFIG.PORT, () => {
      console.log(`Server running at http://localhost:${CONFIG.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
