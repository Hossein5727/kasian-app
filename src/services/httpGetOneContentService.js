import { http } from "./httpServices";

export function httpGetOneContentService(id = 11) {
  return http.get(`/Content/FindById?id=${id}`);
}
