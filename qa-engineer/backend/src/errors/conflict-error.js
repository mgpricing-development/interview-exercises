const util = require("util");

function ConflictError(message) {
  this.status = 409;
  this.message = message;
}
util.inherits(ConflictError, Error);
ConflictError.prototype.name = "ConflictError";

module.exports = ConflictError;
