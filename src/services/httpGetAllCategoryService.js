import { http } from "./httpServices";

export function httpGetAllCategoryService(params) {
  return http.get("/Category/GetAll/");
}
