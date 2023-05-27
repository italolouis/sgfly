import axios from "axios";

const API_URL = "http://localhost:8084"

const Api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
});

Api.interceptors.request.use(
  config => {
    var accessToken:any = {};
    var dataString = localStorage.getItem("access");

    if(dataString != null){
      var data:any = JSON.parse(dataString);
      accessToken = data.token;
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    Promise.reject(error.response || error.message);
  }
);

export default Api;
