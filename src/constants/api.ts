export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/api/auth/register`,
    VERIFY_REGISTRATION: `${API_URL}/api/auth/verify-registration`,
    LOGIN: `${API_URL}/api/auth/login`,
    LOGOUT: `${API_URL}/api/auth/logout`,
    ME: `${API_URL}/api/auth/me`,
    SEND_EMAIL_FORGOT_PASSWORD: `${API_URL}/api/auth/forgot-password-token`,
    VERIFY_FORGOT_PASSWORD_TOKEN: `${API_URL}/api/auth/verify-forgot-password-token`,
    RESET_PASSWORD: `${API_URL}/api/auth/reset-password`
  },
  BLOG: {
    GET_ALL: `${API_URL}/api/blogs`,
    CREATE: `${API_URL}/api/blogs/create`,
    GET_BY_ID: (id: string) => `${API_URL}/api/blogs/${id}`,
    UPDATE_BY_ID: (id: string) => `${API_URL}/api/blogs/${id}`,
    DELETE_BY_ID: (id: string) => `${API_URL}/api/blogs/${id}`,
    TOGGLE_LIKE: (id: string) => `${API_URL}/api/blogs/${id}/toggle-like`,
    GET_OWN_BLOGS: `${API_URL}/api/blogs/own`,
    GET_OWN_BLOG_BY_ID: (id: string) => `${API_URL}/api/blogs/own/${id}`
  },
  LIKE: {
    CHECK_LIKED: (blogId: string) =>
      `${API_URL}/api/likes/check?blogId=${blogId}`
  },
  COMMENT: {
    CREATE: `${API_URL}/api/comments`,
    GET_BY_BLOG: (blogId: string) => `${API_URL}/api/comments/blog/${blogId}`,
    DELETE: (commentId: string) => `${API_URL}/api/comments/${commentId}`,
    UPDATE: (commentId: string) => `${API_URL}/api/comments/${commentId}`
  },
  NOTIFICATIONS: {
    GET_ALL: `${API_URL}/api/notifications`
  },
  UPLOAD: {
    CREATE: `${API_URL}/api/cloudinary/upload`
  },
  ADMIN: {
    AUTH: {
      LOGIN: `${API_URL}/api/auth/login/admin`
    }
  }
};
