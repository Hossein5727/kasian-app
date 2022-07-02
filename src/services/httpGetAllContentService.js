import { http } from "./httpServices";

export function httpGetAllContentService(categoryId = null) {
  return http.get(
    `/Content/GetAllContentVideo${
      categoryId ? `?categoryId=${categoryId}` : ``
    }`
  );
}
