import axios from "axios";

 const api = axios.create({
  baseURL: "http://14.225.207.153:8081/api/", //sever BE
});

export default api;
