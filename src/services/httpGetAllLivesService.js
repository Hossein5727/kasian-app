import { http } from "./httpServices";

export function httpGetAllLivesService() {
  return http.get("/Content/GetAllLives");
}
