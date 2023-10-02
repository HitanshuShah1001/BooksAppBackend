module.exports = (statusCode, res, message) =>
  res.status(statusCode).json({
    status: "Fail",
    message,
  });
