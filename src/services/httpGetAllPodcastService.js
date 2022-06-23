import { http } from "./httpServices";

export function httpGetAllPodcastService() {
  return http.get("/Podcast/GetAll");
}
