import { http } from "./httpServices";

export function httpGetAllPodcastService() {
  return http.get("/Content/GetAllContentAudio");
}
