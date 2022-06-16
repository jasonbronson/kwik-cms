import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_ADDRESS;

axios.interceptors.request.use(
  (config) => {
    console.log(process.env.VUE_APP_API_ADDRESS);
    const token = localStorage.getItem("access_token");
    let authToken = `Bearer ${token}`;
    if (
      config.url.includes("/sign-in") // do not include the token when login
    ) {
      authToken = undefined;
    }
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${token}`;
      // config.headers['Access-Control-Allow-Origin'] = "*"
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 452
    ) {
      localStorage.removeItem("access_token");
    }
    return Promise.reject(error);
  }
);

export default axios;
