const requestContextService = require("../services/request-context.service");

const initializeRequestContext = async(req, res, next) => {
  await requestContextService.startRequest(() => {
    next();
  });
};

module.exports = initializeRequestContext;
