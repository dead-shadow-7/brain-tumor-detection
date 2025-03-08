import multer from "multer";
import { CONFIG } from "../config/config.js";

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: CONFIG.MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (CONFIG.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
    }
  },
});
