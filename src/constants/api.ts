export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/auth/register`,
    VERIFY_REGISTRATION: `${API_URL}/auth/verify-registration`,
    LOGIN: `${API_URL}/auth/login`,
    LOGOUT: `${API_URL}/auth/logout`,
    ME: `${API_URL}/auth/me`,
    SEND_EMAIL_FORGOT_PASSWORD: `${API_URL}/auth/forgot-password-token`,
    VERIFY_FORGOT_PASSWORD_TOKEN: `${API_URL}/auth/verify-forgot-password-token`,
    RESET_PASSWORD: `${API_URL}/auth/reset-password`,
  },
  BLOG: {
    GET_ALL: `${API_URL}/blogs`,
    CREATE: `${API_URL}/blogs/create`,
    GET_BY_ID: (id: string) => `${API_URL}/blogs/${id}`,
    TOGGLE_LIKE: (id: string) => `${API_URL}/blogs/${id}/toggle-like`,
  },
  LIKE: {
    CHECK_LIKED: (blogId: string) => `${API_URL}/likes/check?blogId=${blogId}`,
  },
  COMMENT: {
    CREATE: `${API_URL}/comments`,
    GET_BY_BLOG: (blogId: string) => `${API_URL}/comments/blog/${blogId}`,
    DELETE: (commentId: string) => `${API_URL}/comments/${commentId}`,
    UPDATE: (commentId: string) => `${API_URL}/comments/${commentId}`,
  },
};
