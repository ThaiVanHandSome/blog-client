export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `/api/auth/register`,
    VERIFY_REGISTRATION: `/api/auth/verify-registration`,
    LOGIN: `/api/auth/login`,
    LOGOUT: `/api/auth/logout`,
    ME: `/api/auth/me`,
    SEND_EMAIL_FORGOT_PASSWORD: `/api/auth/forgot-password-token`,
    VERIFY_FORGOT_PASSWORD_TOKEN: `/api/auth/verify-forgot-password-token`,
    RESET_PASSWORD: `/api/auth/reset-password`
  },
  BLOG: {
    GET_ALL: `/api/blogs`,
    CREATE: `/api/blogs/create`,
    GET_BY_ID: (id: string) => `/api/blogs/${id}`,
    TOGGLE_LIKE: (id: string) => `/api/blogs/${id}/toggle-like`
  },
  LIKE: {
    CHECK_LIKED: (blogId: string) => `/api/likes/check?blogId=${blogId}`
  },
  COMMENT: {
    CREATE: `/api/comments`,
    GET_BY_BLOG: (blogId: string) => `/api/comments/blog/${blogId}`,
    DELETE: (commentId: string) => `/api/comments/${commentId}`,
    UPDATE: (commentId: string) => `/api/comments/${commentId}`
  },
  NOTIFICATIONS: {
    GET_ALL: `/api/notifications`
  },
  UPLOAD: {
    CREATE: "/api/cloudinary/upload"
  }
};
