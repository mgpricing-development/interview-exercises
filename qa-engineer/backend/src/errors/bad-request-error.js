const util = require("util");

function BadRequestError(message, errors = []) {
  this.status = 400;
  this.message = message;
  this.errors = errors;
}
util.inherits(BadRequestError, Error);
BadRequestError.prototype.name = "BadRequestError";

module.exports = BadRequestError;
