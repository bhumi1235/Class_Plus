"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    GraduationCap, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2,
    Mail, Phone, Lock, User, MapPin, Globe, UserCircle2, Locate
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/useAuth";
import { API_AUTH_BASE, AUTH_PATHS } from "@/lib/api";

const RESEND_DELAY = 30;

/* Geofence: India bounding box (approx). Adjust or make configurable if needed. */
const GEOFENCE = {
    minLat: 8.0,
    maxLat: 35.5,
    minLon: 68.0,
    maxLon: 97.5,
};

function isWithinGeofence(lat: number, lon: number): boolean {
    if (lat === 0 && lon === 0) return false;
    return lat >= GEOFENCE.minLat && lat <= GEOFENCE.maxLat && lon >= GEOFENCE.minLon && lon <= GEOFENCE.maxLon;
}

type Step = "details" | "otp" | "success";

export default function SignupPage() {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) router.push("/dashboard");
    }, [isAuthenticated, router]);

    const [step, setStep] = useState<Step>("details");

    /* ── Student fields ── */
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [country, setCountry] = useState("India");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    /* ── Parent fields ── */
    const [parentName, setParentName] = useState("");
    const [parentEmail, setParentEmail] = useState("");
    const [parentMobile, setParentMobile] = useState("");

    /* ── OTP state ── */
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [resendCooldown, setResendCooldown] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [studentId, setStudentId] = useState("");

    /* ── UI state ── */
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

    /* ── Timer ── */
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

    /* ── Register → sends OTP ── */
    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return setError("Please enter your full name.");
        if (!email.trim()) return setError("Please enter your email.");
        if (!mobile.trim() || mobile.length < 10) return setError("Please enter a valid 10-digit mobile number.");
        if (password.length < 6) return setError("Password must be at least 6 characters.");
        /* Geofencing: require location and that it's within allowed region */
        if (latitude === 0 && longitude === 0) {
            setError("Please use \"Use my location\" to verify your location. Signup requires your location.");
            return;
        }
        if (!isWithinGeofence(latitude, longitude)) {
            setError("Signup is only available in the allowed region. Your location is outside the service area.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await fetch(`${API_AUTH_BASE}${AUTH_PATHS.registerStudent}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    mobile,
                    password,
                    country,
                    parentName,
                    parentEmail,
                    parentMobile,
                    address,
                    latitude,
                    longitude,
                    playerId: "",
                    deviceType: "web",
                    role: "student",
                }),
            });
            const data = await res.json();
            if (!res.ok || (!data.status && !data.success)) throw new Error(data.message || "Registration failed.");
            setStudentId(data.studentId || "");
            setStep("otp");
            startResendTimer();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* ── Resend OTP ── */
    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        setLoading(true);
        try {
            await fetch(`${API_AUTH_BASE}${AUTH_PATHS.resendOtp}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId }),
            });
            setOtp(["", "", "", "", "", ""]);
            startResendTimer();
        } catch {
            // silently ignore
        } finally {
            setLoading(false);
        }
    };

    /* ── Verify OTP → login ── */
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length < 6) return setError("Please enter the full 6-digit code.");
        setError("");
        setLoading(true);
        try {
            const res = await fetch(`${API_AUTH_BASE}${AUTH_PATHS.verifyOtp}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentId, otp: code, role: "student" }),
            });
            const data = await res.json();

            // Check for status or success flag for robustness
            if (!res.ok || (!data.status && !data.success)) {
                throw new Error(data.message || "Invalid OTP.");
            }

            // CRITICAL: Save the token if provided
            if (data.token) {
                localStorage.setItem("cp_token", data.token);
            }

            login({
                name: data.user?.name || name,
                email: data.user?.email || email
            });

            setStep("success");
            setTimeout(() => router.push("/dashboard"), 1500);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* ── OTP box handlers ── */
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

    /* ── Get current location (latitude/longitude) ── */
    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setLocationError("Location is not supported by your browser.");
            return;
        }
        setLocationError(null);
        setLocationLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setLocationError(null);
                setLocationLoading(false);
            },
            (err) => {
                const msg =
                    err.code === 1
                        ? "Location permission denied. Please allow location access to sign up."
                        : err.code === 2
                            ? "Location unavailable. Check your device location and try again."
                            : "Could not get location. Use HTTPS and allow location access.";
                setLocationError(msg);
                setLocationLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
        );
    };

    if (!mounted) return null;

    /* ─────────── UI ─────────── */
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
                className="relative w-full max-w-[480px] z-10"
            >
                {/* Logo */}
                <div className="mb-8 flex justify-center">
                    <Link href="/" className="flex items-center gap-3">
                        <motion.div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-xl shadow-indigo-500/30"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            <GraduationCap className="h-7 w-7 text-white" strokeWidth={2.5} />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl text-gray-900 tracking-tight leading-none">ClassPlus</span>
                            <span className="text-xs text-gray-500 font-medium">Education Platform</span>
                        </div>
                    </Link>
                </div>

                <motion.div
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    <AnimatePresence mode="wait">

                        {/* ─── STEP 1: Registration Details ─── */}
                        {step === "details" && (
                            <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
                                <div className="mb-6 text-center">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create Student Account</h1>
                                    <p className="mt-1 text-sm text-gray-500">Fill in your details to get started</p>
                                </div>

                                <form onSubmit={handleCreateAccount} className="space-y-4">

                                    {/* ── Student Info ── */}
                                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Student Details</p>

                                    {/* Full name */}
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            required type="text" placeholder="Full Name"
                                            value={name} onChange={e => { setName(e.target.value); setError(""); }}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            required type="email" placeholder="Email Address"
                                            value={email} onChange={e => { setEmail(e.target.value); setError(""); }}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 border-r border-gray-300 pr-2">+91</span>
                                        <input
                                            required type="tel" placeholder="10-digit mobile number"
                                            value={mobile} onChange={e => { setMobile(e.target.value.replace(/\D/, "")); setError(""); }}
                                            maxLength={10}
                                            className="w-full pl-20 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            required type={showPassword ? "text" : "password"} placeholder="Password (min 6 characters)"
                                            value={password} onChange={e => { setPassword(e.target.value); setError(""); }}
                                            className="w-full pl-11 pr-12 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                        />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>

                                    {/* Country + Address */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="text" placeholder="Country"
                                                value={country} onChange={e => setCountry(e.target.value)}
                                                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div className="relative">
                                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="text" placeholder="City / Address"
                                                value={address} onChange={e => setAddress(e.target.value)}
                                                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Geofencing: Latitude / Longitude — required for signup */}
                                    <div className="space-y-1.5">
                                        <p className="text-xs font-medium text-gray-600">Location (required for signup)</p>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button
                                                type="button"
                                                onClick={handleUseMyLocation}
                                                disabled={locationLoading}
                                                className={cn(
                                                    "inline-flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all",
                                                    latitude !== 0 || longitude !== 0
                                                        ? "border-green-300 bg-green-50 text-green-800"
                                                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
                                                )}
                                            >
                                                {locationLoading ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Locate className="h-4 w-4" />
                                                )}
                                                {locationLoading ? "Getting location…" : "Use my location"}
                                            </button>
                                            {(latitude !== 0 || longitude !== 0) && (
                                                <span className="text-xs text-gray-500">
                                                    {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
                                                    {isWithinGeofence(latitude, longitude) && (
                                                        <span className="ml-1 text-green-600">✓ In region</span>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        {locationError && (
                                            <p className="text-red-500 text-xs">{locationError}</p>
                                        )}
                                        {(latitude !== 0 || longitude !== 0) && !isWithinGeofence(latitude, longitude) && (
                                            <p className="text-amber-600 text-xs">Your location is outside the allowed signup region.</p>
                                        )}
                                    </div>

                                    {/* ── Parent Info ── */}
                                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest pt-2">Parent / Guardian Details</p>

                                    <div className="relative">
                                        <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type="text" placeholder="Parent Full Name"
                                            value={parentName} onChange={e => setParentName(e.target.value)}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="email" placeholder="Parent Email"
                                                value={parentEmail} onChange={e => setParentEmail(e.target.value)}
                                                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <input
                                                type="tel" placeholder="Parent Mobile"
                                                value={parentMobile} onChange={e => setParentMobile(e.target.value.replace(/\D/, ""))}
                                                maxLength={10}
                                                className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <Button type="submit" disabled={loading} size="lg"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-300/40 rounded-xl h-12 font-semibold mt-2"
                                    >
                                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                                            <span className="flex items-center justify-center gap-2">
                                                Create Account & Get OTP <ArrowRight className="h-4 w-4" />
                                            </span>
                                        )}
                                    </Button>
                                </form>

                                <p className="mt-5 text-center text-sm text-gray-600">
                                    Already have an account?{" "}
                                    <Link href="/auth/login" className="font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-2">Sign in</Link>
                                </p>
                            </motion.div>
                        )}

                        {/* ─── STEP 2: OTP Verification ─── */}
                        {step === "otp" && (
                            <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8">
                                <div className="mb-6 text-center">
                                    <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                                        <Mail className="h-8 w-8 text-indigo-600" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
                                    <p className="mt-2 text-sm text-gray-500">
                                        We sent a 6-digit code to<br />
                                        <span className="font-semibold text-gray-800">{email}</span>
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

                                    {/* Resend timer */}
                                    <div className="text-center text-sm text-gray-500">
                                        Didn&apos;t receive the code?{" "}
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

                                    <button type="button" onClick={() => { setStep("details"); setOtp(["", "", "", "", "", ""]); setError(""); }}
                                        className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        ← Change details
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {/* ─── STEP 3: Success ─── */}
                        {step === "success" && (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-8 text-center space-y-5">
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                                    className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto"
                                >
                                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                                </motion.div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Account Created!</h2>
                                    <p className="text-gray-500 text-sm mt-2">
                                        Welcome to ClassPlus, {name}!<br />Redirecting you to your dashboard…
                                    </p>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </motion.div>

                {step === "details" && (
                    <p className="mt-4 text-center text-xs text-gray-400">
                        By creating an account you agree to our{" "}
                        <Link href="#" className="underline hover:text-gray-600">Terms</Link> &{" "}
                        <Link href="#" className="underline hover:text-gray-600">Privacy Policy</Link>.
                    </p>
                )}
            </motion.div>
        </div>
    );
}
