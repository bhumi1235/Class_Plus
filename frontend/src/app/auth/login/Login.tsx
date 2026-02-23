"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { GraduationCap, UserCircle2, Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { API_AUTH_BASE, AUTH_PATHS } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const { login, isAuthenticated } = useAuth();

    const [role, setRole] = useState<"student" | "parent">("student");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const isPhone = /^\d+$/.test(identifier) && identifier.length > 0;
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect to dashboard if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, router]);

    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!identifier.trim()) return setError("Please enter your email or mobile.");
        if (!password.trim()) return setError("Please enter your password.");
        setError("");
        setLoading(true);
        try {
            const body = { identifier, password, role };
            const res = await fetch(`${API_AUTH_BASE}${AUTH_PATHS.login}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok || (!data.status && !data.success)) throw new Error(data.message || "Login failed.");
            login({ name: data.user?.name || identifier.split("@")[0], email: data.user?.email || identifier });
            if (data.token) localStorage.setItem("cp_token", data.token);
            router.push("/dashboard");
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const socialVariants = {
        hover: {
            scale: 1.02,
            y: -2,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.98, y: 0 },
    };

    if (!mounted) return null;

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Enhanced animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-bl from-purple-200/40 to-pink-200/40 blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute bottom-[10%] left-[30%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[440px] z-10"
            >
                {/* Logo */}
                <motion.div
                    className="mb-10 flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Link href="/" className="group flex items-center gap-3">
                        <motion.div
                            className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/30"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <GraduationCap className="h-7 w-7 text-white" strokeWidth={2.5} />
                            <motion.div
                                className="absolute inset-0 rounded-2xl bg-white"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 0.2 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-bold text-2xl text-gray-900 tracking-tight leading-none">ClassPlus</span>
                            <span className="text-xs text-gray-500 font-medium">Education Platform</span>
                        </div>
                    </Link>
                </motion.div>

                {/* Main Card with Glass Morphism */}
                <motion.div
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.15)] ring-1 ring-gray-900/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{
                        boxShadow: "0 20px 60px -12px rgba(0,0,0,0.2)",
                    }}
                >
                    {/* Decorative gradient overlay */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-bold tracking-tight text-gray-900"
                        >
                            Welcome back
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-2 text-sm text-gray-600"
                        >
                            Sign in to access your account
                        </motion.p>
                    </div>

                    {/* Enhanced Role Selector */}
                    <LayoutGroup>
                        <motion.div
                            className="mb-8 grid grid-cols-2 gap-2 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-1.5 ring-1 ring-gray-200/50"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            {(["student", "parent"] as const).map((r) => {
                                const isSelected = role === r;
                                const Icon = r === "student" ? GraduationCap : UserCircle2;
                                return (
                                    <motion.button
                                        key={r}
                                        onClick={() => setRole(r)}
                                        className={cn(
                                            "relative flex items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                                            isSelected ? "text-white" : "text-gray-600 hover:text-gray-800"
                                        )}
                                        whileHover={{ scale: isSelected ? 1 : 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {isSelected && (
                                            <motion.div
                                                layoutId="activeRole"
                                                className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30"
                                                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                                            />
                                        )}
                                        <span className="relative z-10 flex items-center gap-2">
                                            <Icon className={cn("h-4.5 w-4.5", isSelected && "drop-shadow-sm")} strokeWidth={2.5} />
                                            {r.charAt(0).toUpperCase() + r.slice(1)}
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </LayoutGroup>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleLogin}
                        className="space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <FloatingInput
                            id="identifier"
                            label="Email or Phone Number"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            prefix={isPhone ? <span className="text-gray-500 font-medium mr-1">+91</span> : null}
                        />

                        <div className="relative">
                            <FloatingInput
                                id="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-[60%] text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-lg hover:bg-gray-100/50"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={showPassword ? "hide" : "show"}
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-all" />
                                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button
                                type="submit"
                                className="group relative w-full overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/40 border-0"
                                size="lg"
                                disabled={loading}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                                    animate={{
                                        x: loading ? ["-100%", "100%"] : "-100%",
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: loading ? Infinity : 0,
                                        ease: "linear"
                                    }}
                                />
                                <span className={cn("flex items-center justify-center gap-2 font-semibold transition-opacity", loading ? "opacity-0" : "opacity-100")}>
                                    Sign in
                                    <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                                </span>
                                {loading && (
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <Loader2 className="h-5 w-5 animate-spin text-white" strokeWidth={2.5} />
                                    </motion.div>
                                )}
                            </Button>
                        </motion.div>
                    </motion.form>

                    {/* Divider */}
                    <motion.div
                        className="my-8 flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <motion.div
                            className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        />
                        <span className="text-xs font-bold uppercase text-gray-400 tracking-widest px-2">Or</span>
                        <motion.div
                            className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        />
                    </motion.div>

                    {/* Social Login */}
                    <motion.div
                        className="grid grid-cols-2 gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                    >
                        <motion.button
                            variants={socialVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="button"
                            className="flex items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                        >
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.5833-.05-1.15-.15-1.7H12.0003v3.2333h4.6667c-.2 1.0833-1.0667 2-2.2833 2-1.95 0-3.5334-1.5833-3.5334-3.5333s1.5834-3.5333 3.5334-3.5333c.8833 0 1.6833.3167 2.3166.8333l2.45-2.45c-1.35-1.2667-3.1333-2.0333-5.1166-2.0333-4.6667 0-8.45 3.7833-8.45 8.45s3.7833 8.45 8.45 8.45z" fill="#4285F4" fillRule="evenodd" />
                                <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.5833-.05-1.15-.15-1.7H12.0003v3.2333h4.6667c-.2 1.0833-1.0667 2-2.2833 2-1.95 0-3.5334-1.5833-3.5334-3.5333s1.5834-3.5333 3.5334-3.5333c.8833 0 1.6833.3167 2.3166.8333l2.45-2.45c-1.35-1.2667-3.1333-2.0333-5.1166-2.0333-4.6667 0-8.45 3.7833-8.45 8.45s3.7833 8.45 8.45 8.45z" fill="#34A853" fillRule="evenodd" clipPath="inset(0 0 9.8% 0)" />
                                <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.5833-.05-1.15-.15-1.7H12.0003v3.2333h4.6667c-.2 1.0833-1.0667 2-2.2833 2-1.95 0-3.5334-1.5833-3.5334-3.5333s1.5834-3.5333 3.5334-3.5333c.8833 0 1.6833.3167 2.3166.8333l2.45-2.45c-1.35-1.2667-3.1333-2.0333-5.1166-2.0333-4.6667 0-8.45 3.7833-8.45 8.45s3.7833 8.45 8.45 8.45z" fill="#FBBC05" fillRule="evenodd" clipPath="inset(0 48% 0 0)" />
                                <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.5833-.05-1.15-.15-1.7H12.0003v3.2333h4.6667c-.2 1.0833-1.0667 2-2.2833 2-1.95 0-3.5334-1.5833-3.5334-3.5333s1.5834-3.5333 3.5334-3.5333c.8833 0 1.6833.3167 2.3166.8333l2.45-2.45c-1.35-1.2667-3.1333-2.0333-5.1166-2.0333-4.6667 0-8.45 3.7833-8.45 8.45s3.7833 8.45 8.45 8.45z" fill="#EA4335" fillRule="evenodd" clipPath="inset(30% 0 0 0)" />
                            </svg>
                            Google
                        </motion.button>
                        <motion.button
                            variants={socialVariants}
                            whileHover="hover"
                            whileTap="tap"
                            type="button"
                            className="flex items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
                        >
                            <span className="flex h-5 w-5 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-[11px] font-bold text-white shadow-sm">
                                #
                            </span>
                            Phone OTP
                        </motion.button>
                    </motion.div>

                    {role === "student" && (
                        <motion.p
                            className="mt-8 text-center text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            Don't have an account?{" "}
                            <Link href="/auth/signup" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2">
                                Sign up free
                            </Link>
                        </motion.p>
                    )}
                </motion.div>

                {/* Trust Badge */}
                <motion.div
                    className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                >
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-medium">Secured by SSL</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

function FloatingInput({ id, label, type = "text", value, onChange, prefix }: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    prefix?: React.ReactNode;
}) {
    const [focused, setFocused] = useState(false);

    return (
        <motion.div
            className="relative"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
        >
            <div className={cn(
                "peer flex items-center w-full rounded-xl border-2 bg-white/50 backdrop-blur-sm px-4 py-3.5 text-sm text-gray-900 font-medium transition-all duration-300",
                focused || value
                    ? "border-indigo-500 bg-white shadow-[0_0_0_4px_rgba(99,102,241,0.1)]"
                    : "border-gray-200 hover:border-gray-300 hover:bg-white"
            )}>
                {prefix && prefix}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full bg-transparent outline-none placeholder-transparent"
                    placeholder={label}
                />
            </div>
            <motion.label
                htmlFor={id}
                className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 pointer-events-none bg-white/0 px-2 font-medium",
                    (focused || value)
                        ? "top-0 left-3 -translate-y-[140%] text-xs text-indigo-600 font-semibold bg-white/80 backdrop-blur-sm rounded-md"
                        : "text-sm"
                )}
                initial={false}
                animate={{
                    scale: (focused || value) ? 1 : 1, // Fixed scale to rely on font-size change and position
                }}
            >
                {label}
            </motion.label>
            {(focused || value) && (
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </motion.div>
    );
}
