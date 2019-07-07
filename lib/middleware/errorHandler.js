module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.httpStatusCode) {
    return res.status(err.httpStatusCode).json({ success: false, error: err.message });
  }

  return res.status(500).json({ success: false, error: "An unexpected error occured" });
};