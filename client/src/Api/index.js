import axios from "axios";
import Cookies from "js-cookie";

const Api = axios.create({
  withCredentials: true,
});

Api.interceptors.request.use((config) => {
  const xsrfToken = Cookies.get("csrf_id");

  if (xsrfToken) config.headers["x-xsrf-token"] = xsrfToken;

  return config;
});

export default Api;
