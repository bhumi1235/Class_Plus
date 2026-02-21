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
