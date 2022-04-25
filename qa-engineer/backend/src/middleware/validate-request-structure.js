const OpenApiValidator = require("express-openapi-validator");

const validateRequestStructure = OpenApiValidator.middleware({
  apiSpec: "./openapi.yaml",
  validateRequests: {
    coerceTypes: true
  },
  validateResponses: {
    removeAdditional: true
  },
  ignorePaths: /^\/healthcheck\/?$/
});

module.exports = validateRequestStructure;
