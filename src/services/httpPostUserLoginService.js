import { http } from "./httpServices";

export function httpPostUserLoginService(data) {
  return http.post("/Login/Login",data);
}
