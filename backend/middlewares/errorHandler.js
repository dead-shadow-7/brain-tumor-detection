export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: err.message || "Internal server error",
    status: "error",
  });
};
