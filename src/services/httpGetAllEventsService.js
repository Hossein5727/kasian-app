import { http } from "./httpServices";

export function httpGetAllEventsService(categoryId = 89) {
  return http.get(
    `/Event/GetAllEvent${categoryId ? `?categoryId=${categoryId}` : ``}`
  );
}
