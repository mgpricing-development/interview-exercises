const { AsyncLocalStorage } = require("async_hooks");
const requestContext = new AsyncLocalStorage();

const startRequest = async (callback) => {
  await requestContext.run(new Map(), callback);
};

const getRequestVariable = (key) => {
  return requestContext.getStore()
    ? requestContext.getStore().get(key)
    : undefined;
};

const setRequestVariable = (key, value) => {
  if (requestContext.getStore()) {
    requestContext.getStore().set(key, value);
  }
};

module.exports = {
  startRequest,
  getRequestVariable,
  setRequestVariable
};
