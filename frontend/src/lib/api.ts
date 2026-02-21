/**
 * Backend base URLs and API path constants.
 * - Auth (login, register, verify-otp, resend-otp): classplus-iwn1
 * - Forgot password flow: classplus-9siz
 */

export const API_AUTH_BASE = "https://classplus-iwn1.onrender.com/api";
export const API_FORGOT_PASSWORD_BASE = "https://classplus-9siz.onrender.com/api";

export const AUTH_PATHS = {
    login: "/auth/login",
    registerStudent: "/auth/register/student",
    verifyOtp: "/auth/verify-otp",
    resendOtp: "/auth/resend-otp",
} as const;

export const FORGOT_PASSWORD_PATHS = {
    forgotPassword: "/auth/forgot-password",
    verifyForgotPasswordOtp: "/auth/verify-forgot-password-otp",
    resetPassword: "/auth/reset-password",
} as const;

/** Course data backend (e.g. http://51.20.53.47:5000) — use env NEXT_PUBLIC_COURSE_API_BASE to override */
export const COURSE_API_BASE =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_COURSE_API_BASE) ||
    "http://51.20.53.47:5000";

export const COURSE_PATHS = {
    /** GET course page data for a user/batch: /api/android/coursepagedata/:userId */
    coursePageData: (userId: string) => `/api/android/coursepagedata/${userId}`,
} as const;
