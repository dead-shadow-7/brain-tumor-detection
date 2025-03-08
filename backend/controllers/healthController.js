export const healthCheck = (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
};
