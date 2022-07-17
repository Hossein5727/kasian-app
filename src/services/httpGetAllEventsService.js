import { http } from "./httpServices";

export function httpGetAllEventsService(categoryId = null) {
  return http.get(
    `/Event/GetAllEvent${categoryId ? `?categoryId=${categoryId}` : ``}`
  );
}
