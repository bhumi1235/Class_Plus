"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import Link from "next/link";
import {
    ArrowRight, Star, CirclePlay, Users, BookOpen, Quote,
    GraduationCap, UserCircle2, Mail, Lock, Smartphone, Eye, EyeOff, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Inline Auth Panel
───────────────────────────────────────────── */
function AuthPanel() {
    const { login } = useAuth();
    const router = useRouter();

    const [tab, setTab] = useState<"login" | "signup">("login");
    const [role, setRole] = useState<"student" | "parent">("student");
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPhoneAuth, setIsPhoneAuth] = useState(false);

    // Signup-only fields
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        const displayName = tab === "signup" ? name || "Student" : identifier.split("@")[0] || "User";
        login({ name: displayName, email: identifier });
        router.push("/dashboard");
    };

    return (
        <div className="w-full bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(79,70,229,0.25)] ring-1 ring-indigo-100 overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-8">
                {/* Login / Sign Up pill toggle */}
                <div className="mb-6 flex items-center justify-center gap-3">
                    <span className={cn("text-sm font-semibold transition-colors", tab === "login" ? "text-indigo-700" : "text-gray-400")}>Log In</span>
                    <button
                        type="button"
                        onClick={() => setTab(tab === "login" ? "signup" : "login")}
                        className={cn(
                            "relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                            tab === "signup" ? "bg-indigo-600" : "bg-gray-300"
                        )}
                        role="switch"
                        aria-checked={tab === "signup"}
                    >
                        <span
                            className={cn(
                                "pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
                                tab === "signup" ? "translate-x-7" : "translate-x-0"
                            )}
                        />
                    </button>
                    <span className={cn("text-sm font-semibold transition-colors", tab === "signup" ? "text-indigo-700" : "text-gray-400")}>Sign Up</span>
                </div>

                {/* Student / Parent role selector */}
                <LayoutGroup>
                    <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 p-1.5 ring-1 ring-gray-200/50">
                        {(["student", "parent"] as const).map((r) => {
                            const isSelected = role === r;
                            const Icon = r === "student" ? GraduationCap : UserCircle2;
                            return (
                                <motion.button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={cn(
                                        "relative flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all outline-none",
                                        isSelected ? "text-white" : "text-gray-600 hover:text-gray-800"
                                    )}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {isSelected && (
                                        <motion.div
                                            layoutId="landingRoleIndicator"
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name field (signup only) */}
                    {tab === "signup" && (
                        <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                <GraduationCap className="h-5 w-5" />
                            </span>
                            <input
                                type="text"
                                required
                                placeholder={role === "parent" ? "Parent's Full Name" : "Your Full Name"}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>
                    )}

                    {/* Email / Phone */}
                    <div>
                        <div className="relative">
                            {isPhoneAuth ? (
                                <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            ) : (
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            )}
                            {isPhoneAuth && (
                                <span className="absolute left-11 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500 border-r border-gray-300 pr-2">+91</span>
                            )}
                            <input
                                type={isPhoneAuth ? "tel" : "email"}
                                required
                                placeholder={isPhoneAuth ? "98765 43210" : role === "parent" ? "parent@example.com" : "student@example.com"}
                                value={identifier}
                                onChange={e => setIdentifier(e.target.value)}
                                className={cn(
                                    "w-full pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm",
                                    isPhoneAuth ? "pl-20" : "pl-11"
                                )}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsPhoneAuth(!isPhoneAuth)}
                            className="mt-1 ml-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                        >
                            Use {isPhoneAuth ? "email" : "phone"} instead
                        </button>
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>

                    {/* Confirm password (signup only) */}
                    {tab === "signup" && (
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="password"
                                required
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm"
                            />
                        </div>
                    )}

                    {/* Forgot password (login only) */}
                    {tab === "login" && (
                        <div className="text-right">
                            <Link href="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                                Forgot Password?
                            </Link>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
                    >
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            <>
                                {tab === "login"
                                    ? `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`
                                    : "Create Account"}
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-400">
                    By continuing, you agree to our{" "}
                    <span className="text-indigo-600 cursor-pointer hover:underline">Terms</span> and{" "}
                    <span className="text-indigo-600 cursor-pointer hover:underline">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Landing Page
───────────────────────────────────────────── */
export default function LandingPage() {

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700">
            <Navbar />

            {/* Hero Section — split layout */}
            <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
                {/* Background blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-100/50 blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/60 blur-3xl" />
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        {/* Left — Marketing copy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                                New Batches starting soon!
                            </div>

                            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:leading-[1.1]">
                                Master Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                                    Dream Career
                                </span>
                            </h1>

                            <p className="max-w-xl mx-auto lg:mx-0 text-xl text-gray-500 leading-relaxed">
                                Join India's most loved learning platform. Interactive live classes, personalized mentorship, and comprehensive study material designed for your success.
                            </p>

                            {/* Social proof */}
                            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 border-t border-gray-100/50">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="h-10 w-10 rounded-full border-3 border-white bg-gray-200 bg-cover shadow-md"
                                            style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')` }}
                                        />
                                    ))}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-50 text-xs font-bold text-indigo-600 shadow-md">
                                        +2M
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-0.5 text-yellow-500">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-600 mt-0.5">Trusted by 2M+ Students</p>
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                {[
                                    { label: "Live Classes", value: "100+/day", icon: CirclePlay },
                                    { label: "Top Educators", value: "500+", icon: BookOpen },
                                    { label: "Students", value: "5M+", icon: Users },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-center">
                                        <s.icon className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                                        <p className="font-extrabold text-gray-900 text-lg leading-none">{s.value}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Inline Auth Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            <AuthPanel />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Student Stories */}
            <section className="py-20 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Inspiring Student Stories</h2>
                        <p className="text-lg text-gray-500">Hear from students who transformed their careers with ClassPlus.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Ananya Sharma", role: "JEE Advanced AIR 45", image: "https://i.pravatar.cc/150?img=5", quote: "The structured curriculum and 24/7 doubt support were game changers for me. I couldn't have cracked JEE without ClassPlus." },
                            { name: "Rahul Verma", role: "NEET Top Ranker", image: "https://i.pravatar.cc/150?img=11", quote: "Live interactions with teachers made complex topics so easy to understand. The mock tests were exactly like the real exam." },
                            { name: "Priya Patel", role: "Cleared UPSC CSE", image: "https://i.pravatar.cc/150?img=9", quote: "Consistency is key for UPSC, and ClassPlus helped me stay consistent with their daily targets and mentorship program." },
                        ].map((story, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <Quote className="h-10 w-10 text-indigo-200 mb-6" />
                                <p className="text-gray-600 mb-8 leading-relaxed italic">&ldquo;{story.quote}&rdquo;</p>
                                <div className="flex items-center gap-4">
                                    <img src={story.image} alt={story.name} className="h-12 w-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                                        <p className="text-sm text-indigo-600 font-medium">{story.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
