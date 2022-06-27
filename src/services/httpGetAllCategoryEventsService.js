import { http } from "./httpServices";

export function httpGetAllCategoryEventsService() {
  http.get("/api/Category/GetAllCategoryEvents");
}
