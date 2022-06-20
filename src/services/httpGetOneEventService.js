import { http } from "./httpServices";

export function httpGetOneEventService(id = 4) {
  return http.get(`/Event/FindById?id=${id}`);
}
