import { http } from "./httpServices";

export function httpGetAllCategoryPodcastService() {
  return http.get("/Category/GetAllContentSoundCategory");
}
