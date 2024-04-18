const util = require("util");

function ResourceLockedError(message, data) {
  this.status = 423;
  this.message = message;
  this.data = data;
}
util.inherits(ResourceLockedError, Error);
ResourceLockedError.prototype.name = "ResourceLockedError";

module.exports = ResourceLockedError;
