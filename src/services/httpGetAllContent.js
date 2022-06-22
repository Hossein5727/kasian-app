import { http } from "./httpServices";

export function httpGetAllContent() {
  return http.get("/Content/GetAllLives");
}
