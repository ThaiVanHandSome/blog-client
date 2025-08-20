import { API_ENDPOINTS } from "@/constants/api";
import { RegisterRequest } from "@/types/auth.type";
import { DataResponse } from "@/types/http.type";
import http from "@/utils/http";

export class AuthService {
  static async register(data: RegisterRequest) {
    return http.post<DataResponse>(API_ENDPOINTS.AUTH.REGISTER, data);
  }
}
