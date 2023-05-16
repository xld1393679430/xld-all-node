import axios from "axios";

const BASE_URL = "http://127.0.0.1:7001";

const server = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 5,
});

function onSuccess(response) {
  return response.data;
}

function onFail() {
  return Promise.reject(error);
}

server.interceptors.response.use(onSuccess, onFail);

export default server;
