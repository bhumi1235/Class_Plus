"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, UserCircle2, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/useAuth";

type Step = "details" | "otp" | "success";
const RESEND_DELAY = 30;

export default function SignupPage() {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) router.push("/dashboard");
    }, [isAuthenticated, router]);

    const [role, setRole] = useState<"student" | "parent">("student");
    const [step, setStep] = useState<Step>("details");

    // Form fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identifier, setIdentifier] = useState(""); // email or phone
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // OTP state
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [resendCooldown, setResendCooldown] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

    const isPhone = /^\d+$/.test(identifier) && identifier.length > 0;

    const startResendTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setResendCooldown(RESEND_DELAY);
        timerRef.current = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) { clearInterval(timerRef.current!); return 0; }
                return prev - 1;
            });
        }, 1000);
    };

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName.trim()) return setError("Please enter your first name.");
        if (!identifier.trim()) return setError("Please enter your email or phone number.");
        if (password.length < 8) return setError("Password must be at least 8 characters.");
        setError("");
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200)); // simulate API
        setLoading(false);
        setStep("otp");
        startResendTimer();
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const next = [...otp];
        next[index] = value.slice(-1);
        setOtp(next);
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };
    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setOtp(["", "", "", "", "", ""]);
        startResendTimer();
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length < 6) return setError("Please enter the full 6-digit code.");
        setError("");
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        // Simulate account creation and login
        login({ name: `${firstName} ${lastName}`.trim(), email: identifier });
        setLoading(false);
        setStep("success");
    };

    if (!mounted) return null;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10">
            {/* BG Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-bl from-purple-200/40 to-pink-200/40 blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[440px] z-10"
            >
                {/* Logo */}
                <motion.div className="mb-10 flex justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}>
                    <Link href="/" className="flex items-center gap-3">
                        <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/30"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <GraduationCap className="h-7 w-7 text-white" strokeWidth={2.5} />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl text-gray-900 tracking-tight leading-none">ClassPlus</span>
                            <span className="text-xs text-gray-500 font-medium">Education Platform</span>
                        </div>
                    </Link>
                </motion.div>

                <motion.div
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <AnimatePresence mode="wait">

                        {/* ─── STEP 1: Account Details ─── */}
                        {step === "details" && (
                            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="mb-6 text-center">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Account</h1>
                                    <p className="mt-2 text-sm text-gray-500">Join thousands of students learning on ClassPlus</p>
                                </div>

                                {/* Role Selector */}
                                <LayoutGroup>
                                    <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-gray-100/70 p-1.5 ring-1 ring-gray-200/50">
                                        {(["student", "parent"] as const).map((r) => {
                                            const isSelected = role === r;
                                            const Icon = r === "student" ? GraduationCap : UserCircle2;
                                            return (
                                                <motion.button key={r} onClick={() => setRole(r)}
                                                    className={cn("relative flex items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-semibold transition-colors", isSelected ? "text-white" : "text-gray-600")}
                                                    whileHover={{ scale: isSelected ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
                                                >
                                                    {isSelected && (
                                                        <motion.div layoutId="signupRole"
                                                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
                                                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                                        />
                                                    )}
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        <Icon className="h-4 w-4" strokeWidth={2.5} />
                                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                                    </span>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </LayoutGroup>

                                <form onSubmit={handleCreateAccount} className="space-y-4">
                                    {/* Name */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text" placeholder="First name" value={firstName}
                                            onChange={(e) => { setFirstName(e.target.value); setError(""); }}
                                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                                        />
                                        <input
                                            type="text" placeholder="Last name" value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-sm"
                                        />
                                    </div>

                                    {/* Email or Phone */}
                                    <div className="relative">
                                        {isPhone
                                            ? <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            : <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        }
                                        <input
                                            type="text" placeholder="Email or phone number" value={identifier}
                                            onChange={(e) => { setIdentifier(e.target.value); setError(""); }}
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"} placeholder="Password (min 8 characters)"
                                            value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                            className="w-full pl-4 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>

                                    {/* Password strength */}
                                    {password && (
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4].map((lvl) => (
                                                <div key={lvl} className={cn("h-1.5 flex-1 rounded-full transition-all duration-300", {
                                                    "bg-red-400": password.length >= 2 && password.length < 8,
                                                    "bg-yellow-400": password.length >= 8 && lvl <= 2,
                                                    "bg-green-400": password.length >= 8 && lvl <= 3 && /[A-Z]/.test(password) && /\d/.test(password),
                                                    "bg-emerald-500": password.length >= 10 && /[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password),
                                                    "bg-gray-200": password.length < 2,
                                                })} />
                                            ))}
                                        </div>
                                    )}

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <Button type="submit" disabled={loading} size="lg"
                                            className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/30 border-0 rounded-xl h-12"
                                        >
                                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                                <span className="flex items-center justify-center gap-2 font-semibold">
                                                    Create Account
                                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </span>
                                            )}
                                        </Button>
                                    </motion.div>
                                </form>

                                <p className="mt-6 text-center text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link href="/auth/login" className="font-bold text-indigo-600 hover:text-indigo-700 underline decoration-2 underline-offset-2">Sign in</Link>
                                </p>
                            </motion.div>
                        )}

                        {/* ─── STEP 2: OTP Verification ─── */}
                        {step === "otp" && (
                            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="mb-6 text-center">
                                    <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                                        {isPhone ? <Phone className="h-8 w-8 text-indigo-600" /> : <Mail className="h-8 w-8 text-indigo-600" />}
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900">Verify Your {isPhone ? "Phone" : "Email"}</h1>
                                    <p className="mt-2 text-sm text-gray-500">
                                        We sent a 6-digit code to<br />
                                        <span className="font-semibold text-gray-700">{identifier}</span>
                                    </p>
                                </div>

                                <form onSubmit={handleVerifyOtp} className="space-y-6">
                                    {/* OTP boxes */}
                                    <div className="flex justify-center gap-2.5">
                                        {otp.map((digit, i) => (
                                            <input
                                                key={i}
                                                ref={(el) => { otpRefs.current[i] = el; }}
                                                type="text" inputMode="numeric" maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                                className="w-11 h-14 text-center text-xl font-bold rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-gray-900 bg-gray-50"
                                            />
                                        ))}
                                    </div>

                                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                    {/* Timer / Resend */}
                                    <div className="text-center text-sm text-gray-500">
                                        Didn't receive the code?{" "}
                                        {resendCooldown > 0 ? (
                                            <span className="text-gray-400">
                                                Resend in <span className="font-bold text-indigo-600">{resendCooldown}s</span>
                                            </span>
                                        ) : (
                                            <button type="button" onClick={handleResendOtp} disabled={loading}
                                                className="font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-2 disabled:opacity-50"
                                            >
                                                {loading ? "Sending…" : "Resend OTP"}
                                            </button>
                                        )}
                                    </div>

                                    <Button type="submit" disabled={loading || otp.join("").length < 6}
                                        className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold"
                                    >
                                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Create Account"}
                                    </Button>

                                    <button type="button" onClick={() => { setStep("details"); setOtp(["", "", "", "", "", ""]); }}
                                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        ← Change contact info
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* ─── STEP 3: Success ─── */}
                        {step === "success" && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 space-y-5">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                                    className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                                </motion.div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Account Created!</h2>
                                    <p className="text-gray-500 text-sm mt-2">Welcome to ClassPlus, {firstName}! Redirecting you to your dashboard…</p>
                                </div>
                                <Button onClick={() => router.push("/dashboard")}
                                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold"
                                >
                                    Go to Dashboard
                                </Button>
                            </motion.div>
                        )}

                    </AnimatePresence>

                    {step === "details" && (
                        <p className="mt-4 text-center text-xs text-gray-400">
                            By creating an account you agree to our{" "}
                            <Link href="#" className="underline hover:text-gray-600">Terms</Link> &{" "}
                            <Link href="#" className="underline hover:text-gray-600">Privacy Policy</Link>.
                        </p>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
