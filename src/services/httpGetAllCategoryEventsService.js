import { http } from "./httpServices";

export function httpGetAllCategoryEventsService() {
  http.get("/Category/GetAllEventCategory");
}
