const util = require("util");

function NotFoundError(message) {
  this.status = 404;
  this.message = message;
}
util.inherits(NotFoundError, Error);
NotFoundError.prototype.name = "NotFoundError";

module.exports = NotFoundError;
