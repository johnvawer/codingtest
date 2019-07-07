const errorUtils = require("../utils/error");

module.exports = (req, res, next) => {
  return next(errorUtils.notFound());
}