import httpService from "./http.service";

const getConfig = () =>
  httpService
    .get(`/config/`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response));

export default {
  getConfig
};
