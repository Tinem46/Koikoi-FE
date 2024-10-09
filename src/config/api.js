import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api/", // Ensure this matches your backend server
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
