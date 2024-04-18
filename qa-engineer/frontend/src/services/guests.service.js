import httpService from "./http.service";

const registerGuest = ({ email, reportId }) =>
  httpService
    .post(`/guests`, { email, reportId })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response));

const getGuest = () =>
  httpService
    .get(`/guests/me`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response));

export default {
  registerGuest,
  getGuest
};
