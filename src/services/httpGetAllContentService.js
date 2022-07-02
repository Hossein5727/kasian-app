import { http } from "./httpServices";

export function httpGetAllContentService(pageNumber = 1) {
  return http.get(`/Content/GetAllContentVideo?pageNumber=${pageNumber}`);
}
