import axios from "axios";

axios.defaults.basesURL = "https://api.kasianmedia.com/api/";
// axios.defaults.baseURL = "https://192.168.100.22:45455/api/";

export const http = {
  get: axios.get,
  put: axios.put,
  post: axios.post,
  delete: axios.delete,
};
