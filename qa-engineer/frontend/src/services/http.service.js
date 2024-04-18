import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import CookieNames from "../utils/cookie-names";
import Cookies from "js-cookie";

const baseURL = getBaseUrl();
const http = axios.create({ baseURL: `${baseURL}/` });
let basicAuthenticationValue = null;

function getBaseUrl() {
  const matches = window.location.hostname.match(/^.*?([^.]+)\.cuvama\.com$/);

  if (matches) {
    switch (matches[1]) {
      default:
        return "https://api-interview-exercise.dev.cuvama.com";
    }
  }

  return process.env.REACT_APP_API;
}

const setBasicAuthentication = ({ basicAuthentication }) => {
  console.log("setBasicAuthentication", basicAuthentication);
  basicAuthenticationValue = basicAuthentication;
};

function getRequestHeaders() {
  const headers = {};
  headers["Authorization"] = `Basic ${basicAuthenticationValue}`;
  headers["X-Request-Id"] = uuidv4();
  headers["X-Guest-Id"] = getGuestId();

  return headers;
}

let guestId = null;
function getGuestId() {
  if (!guestId) {
    guestId = Cookies.get(`cuvama_${CookieNames.GUEST_ID}`);
  }
  return guestId;
}

function get(url, headers = {}, params = {}) {
  return http.get(url, {
    params,
    headers: { ...getRequestHeaders(), ...headers }
  });
}

function post(url, data, headers = {}, params = {}) {
  return http.post(url, data, {
    ...params,
    headers: { ...getRequestHeaders(), ...headers }
  });
}

function patch(url, data, headers = {}, params = {}) {
  return http.patch(url, data, {
    ...params,
    headers: { ...getRequestHeaders(), ...headers }
  });
}

function put(url, data, headers = {}) {
  return http.put(url, data, {
    headers: { ...getRequestHeaders(), ...headers }
  });
}

function doDelete(url, data, headers = {}) {
  return http.delete(url, {
    headers: { ...getRequestHeaders(), ...headers },
    data
  });
}

const uploadFile = (url, file, onUploadProgress, signal) => {
  const config = {
    timeout: 60 * 1000,
    headers: {
      "content-type": file.type
    }
  };

  if (onUploadProgress) {
    config["onUploadProgress"] = onUploadProgress;
  }

  if (signal) {
    config["signal"] = signal;
  }

  return http.put(url, file, config);
};

export default {
  get,
  post,
  patch,
  put,
  delete: doDelete,
  uploadFile,
  setBasicAuthentication
};
