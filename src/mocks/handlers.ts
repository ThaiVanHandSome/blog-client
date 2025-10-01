import { API_ENDPOINTS } from "@/constants/api";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(`${API_ENDPOINTS.BLOG.TOGGLE_LIKE(":id")}`, () => {
    return HttpResponse.json({
      data: 3
    });
  })
];
