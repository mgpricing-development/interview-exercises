const ForbiddenError = require("./forbidden-error");
const NotFoundError = require("./not-found-error");
const BadRequestError = require("./bad-request-error");
const ConflictError = require("./conflict-error");
const ResourceLockedError = require("./resource-locked-error");
const DocXTemplateError = require("./docx-template-error");

module.exports = {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
  ResourceLockedError,
  DocXTemplateError
};
