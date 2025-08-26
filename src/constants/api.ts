export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/auth/register`,
    VERIFY_REGISTRATION: `${API_URL}/auth/verify-registration`,
    LOGIN: `${API_URL}/auth/login`,
    SEND_EMAIL_FORGOT_PASSWORD: `${API_URL}/auth/forgot-password-token`,
    VERIFY_FORGOT_PASSWORD_TOKEN: `${API_URL}/auth/verify-forgot-password-token`,
    RESET_PASSWORD: `${API_URL}/auth/reset-password`,
  },
  BLOG: {
    GET_ALL: `${API_URL}/blogs`,
    CREATE: `${API_URL}/blogs/create`,
  },
};
