import httpService from "./http.service";

const getTasks = () =>
  httpService
    .get(`/tasks/`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response));

const createTask = ({ name }) =>
  httpService
    .post(`/tasks/`, { name })
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response));

const deleteTask = ({ taskId }) =>
  httpService
    .delete(`/tasks/${taskId}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err.response));

export default {
  getTasks,
  createTask,
  deleteTask
};
