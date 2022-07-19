import { http } from "./httpServices";

export function httpGetAllPodcastService(categoryId = null) {
  return http.get(`/Content/GetAllContentAudio?categoryId=${categoryId}`);
}
