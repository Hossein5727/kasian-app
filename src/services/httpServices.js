import axios from "axios";

axios.defaults.baseURL = "https://api.kasianmedia.com/api/";
// axios.defaults.baseURL = "https://192.168.100.5:45455/api/";

export const http = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};
