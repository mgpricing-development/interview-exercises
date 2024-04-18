const util = require("util");

function ForbiddenError(message, data) {
  this.status = 403;
  this.message = message;
  this.data = data;
}
util.inherits(ForbiddenError, Error);
ForbiddenError.prototype.name = "ForbiddenError";

module.exports = ForbiddenError;
