import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-xsrf-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-xsrf-token"];
  }
};

export default setAuthToken;
