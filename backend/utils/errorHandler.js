"use strict";

const errorHandler = (errMessage, status) => {
  const error = new Error(errMessage);
  error.status = status;
  return error;
};

module.exports = {
  errorHandler,
};
