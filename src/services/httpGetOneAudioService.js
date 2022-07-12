import { http } from "./httpServices";

export function httpGetOneAudioService(id) {
  return http.get(`/Content/FindById?id=${id}`);
}
