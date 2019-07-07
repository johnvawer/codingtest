const notFound = message => {
  const error = new Error(message || "Requested resource not found");
  error.httpStatusCode = 404;
  return error;
};

const sqlError = (message, err) => {
  const error = new Error(message || "MYSQL error");
  error.httpStatusCode = 500;
  error.originalError = err;
  return error;
}

const validationError = (field, message) => {
  const error = new Error(`Error on field: ${field}, ${message}`);
  error.httpStatusCode = 400;
  return error;
}

module.exports = {
  notFound,
  sqlError,
  validationError,
};