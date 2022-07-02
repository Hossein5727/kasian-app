import { http } from "./httpServices";

export function httpGetAllLivesService() {
  return http.get("/Content/GetAllLives");
}

export function httpGetCurrentLiveService() {
  return http.get("/Content/GetCurrentLive");
}
