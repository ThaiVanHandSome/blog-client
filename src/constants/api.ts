export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/auth/register`
  }
};
