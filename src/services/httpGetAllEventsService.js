import { http } from "./httpServices";

export function httpGetAllEventsService() {
  return http.get("/Event/GetAllEvent");
}
