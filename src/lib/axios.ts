import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "config";
import store from "store";

export const getToken = () => {
  return localStorage.getItem("jwtToken");
  // return store?.getState().auth?.jwttoken || "";
};

export const setToken = (jwtToken: string) => {
  localStorage.setItem("jwtToken", jwtToken);
};

export const getProfileId = () => {
  return "ead4e193-1e7d-43e7-b659-d8bd89cf3e14";
};

export const getUserId = () => {
  return "ead4e193-1e7d-43e7-b659-d8bd89cf3e14";
};

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.timeout = API_TIMEOUT;

axios.interceptors.request.use(
  async (config: any) => {
    const jwtToken = getToken();

    if (jwtToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${jwtToken}`,
        profileId: getProfileId(),
        userId: getUserId(),
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    const retryStatuses = [401, 403];
    if (retryStatuses.includes(error.response.status) && !config?.sent) {
      config.sent = true;

      const token = await axios.post("/authenticate", {
        username: "test",
        password: "passmein",
      });

      if (token?.data) {
        const jwtToken = token?.data.jwttoken;
        setToken(jwtToken);

        config.headers = {
          ...config.headers,
          authorization: `Bearer ${jwtToken}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export default axios;
