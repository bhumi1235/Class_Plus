/**
 * Backend base URL for auth and most APIs (includes /api).
 */
const API_BASE =
    typeof window !== "undefined"
        ? "/api/proxy/api"
        : (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_API_BASE) ||
        "http://13.60.13.116:5000/api";

export const API_AUTH_BASE = API_BASE;
export const API_FORGOT_PASSWORD_BASE = API_BASE;

/** Course page data uses path android/coursepagedata/:userId (no /api prefix). */
export const COURSE_API_BASE =
    typeof window !== "undefined"
        ? "/api/proxy"
        : (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_COURSE_API_BASE) ||
        "http://13.60.13.116:5000";

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
    /** GET course page data: /api/android/coursepagedata/:userId */
    coursePageData: (userId: string) => `/api/android/coursepagedata/${userId}`,
} as const;
