import { http } from "./httpServices";

export function httpGetAllContentService() {
  return http.get("/Content/GetAllLives");
}
