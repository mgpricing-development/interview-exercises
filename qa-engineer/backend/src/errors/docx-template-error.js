const util = require("util");

function DocXTemplateError(message, errors = []) {
  this.status = 400;
  this.message = message;
  this.errors = errors;
}
util.inherits(DocXTemplateError, Error);
DocXTemplateError.prototype.name = "DocXTemplateError";

module.exports = DocXTemplateError;
