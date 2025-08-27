export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface MeResponse {
  name: string;
  email: string;
  role: string;
}
