/**
 * Backend base URL — all API calls use this base.
 * Override with NEXT_PUBLIC_API_BASE if needed.
 */
const API_BASE =
    (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE) ||
    "http://51.20.53.47:5000/api";

export const API_AUTH_BASE = API_BASE;
export const API_FORGOT_PASSWORD_BASE = API_BASE;
export const COURSE_API_BASE = API_BASE;

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

export const COURSE_PATHS = {
    /** GET course page data for a user/batch: /android/coursepagedata/:userId */
    coursePageData: (userId: string) => `/android/coursepagedata/${userId}`,
} as const;
