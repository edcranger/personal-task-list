import axios from "axios";
import Cookies from "js-cookie";

const xsrfToken = Cookies.get("csrf_id");

const Api = axios.create({
  withCredentials: true,
});

Api.interceptors.request.use((config) => {
  if (xsrfToken) config.headers["x-xsrf-token"] = xsrfToken;

  return config;
});

export default Api;
