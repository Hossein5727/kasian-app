import { http } from "./httpServices";

export function httpGetAllCategoryService() {
  return http.get("/Category/GetAll/");
}
