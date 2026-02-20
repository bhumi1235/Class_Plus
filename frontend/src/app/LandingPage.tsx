"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    ArrowRight, Star, Users, BookOpen, CirclePlay, Quote,
    GraduationCap, UserCircle2, Mail, Lock, Eye, EyeOff,
    Smartphone, Loader2, CheckCircle2
} from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/Footer";

/* ════════════════════════════════════════════
   AUTH CARD — embedded directly on landing page
════════════════════════════════════════════ */
function AuthCard() {
    const { login } = useAuth();
    const router = useRouter();

    // mode: login or signup
    const [isSignup, setIsSignup] = useState(false);
    // role toggle
    const [role, setRole] = useState<"student" | "parent">("student");
    // form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [usePhone, setUsePhone] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(r => setTimeout(r, 1000));
        const displayName = isSignup ? (name || "Student") : ((usePhone ? phone : email).split("@")[0] || "User");
        login({ name: displayName, email: usePhone ? `${phone}@phone.local` : email });
        setDone(true);
        await new Promise(r => setTimeout(r, 600));
        router.push("/dashboard");
    };

    return (
        <div className="w-full max-w-[420px] mx-auto">
            {/* Card */}
            <div className="bg-white rounded-3xl shadow-[0_24px_80px_-12px_rgba(79,70,229,0.22)] ring-1 ring-indigo-100 overflow-hidden">

                {/* Top bar */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="px-8 pt-7 pb-8 space-y-6">

                    {/* ── Logo + heading ── */}
                    <div className="text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-extrabold text-xl shadow-lg shadow-indigo-300/40 mb-3">
                            C+
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {isSignup ? "Create your account" : "Welcome back"}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {isSignup ? "Join millions of students on ClassPlus" : "Sign in to continue learning"}
                        </p>
                    </div>

                    {/* ── Login / Sign Up toggle ── */}
                    <div className="flex items-center justify-center gap-3">
                        <span className={cn("text-sm font-semibold transition-colors duration-200", !isSignup ? "text-indigo-700" : "text-gray-400")}>
                            Log In
                        </span>
                        <button
                            type="button"
                            onClick={() => setIsSignup(!isSignup)}
                            aria-label="Toggle login / signup"
                            className={cn(
                                "relative inline-flex h-7 w-14 shrink-0 rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                                isSignup ? "bg-indigo-600" : "bg-gray-300"
                            )}
                        >
                            <span className={cn(
                                "inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out",
                                isSignup ? "translate-x-7" : "translate-x-0"
                            )} />
                        </button>
                        <span className={cn("text-sm font-semibold transition-colors duration-200", isSignup ? "text-indigo-700" : "text-gray-400")}>
                            Sign Up
                        </span>
                    </div>

                    {/* ── Student / Parent role selector ── */}
                    <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 rounded-2xl ring-1 ring-gray-200">
                        {(["student", "parent"] as const).map((r) => {
                            const active = role === r;
                            const Icon = r === "student" ? GraduationCap : UserCircle2;
                            return (
                                <button
                                    key={r}
                                    type="button"
                                    onClick={() => setRole(r)}
                                    className={cn(
                                        "relative flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
                                        active
                                            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-300/40"
                                            : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    <Icon className="h-4 w-4" strokeWidth={2.5} />
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </button>
                            );
                        })}
                    </div>

                    {/* ── Form ── */}
                    <form onSubmit={handleSubmit} className="space-y-3">

                        {/* Name — signup only */}
                        <AnimatePresence>
                            {isSignup && (
                                <motion.div
                                    key="name"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                                        <input
                                            type="text"
                                            required={isSignup}
                                            placeholder={role === "parent" ? "Parent / Guardian Name" : "Full Name"}
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Email / Phone */}
                        <div className="space-y-1">
                            <div className="relative">
                                {usePhone
                                    ? <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                                    : <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                                }
                                {usePhone && (
                                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 border-r border-gray-300 pr-2">+91</span>
                                )}
                                <input
                                    type={usePhone ? "tel" : "email"}
                                    required
                                    placeholder={usePhone ? "Mobile number" : (role === "parent" ? "parent@email.com" : "student@email.com")}
                                    value={usePhone ? phone : email}
                                    onChange={e => usePhone ? setPhone(e.target.value) : setEmail(e.target.value)}
                                    className={cn(
                                        "w-full pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all",
                                        usePhone ? "pl-16" : "pl-10"
                                    )}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => setUsePhone(!usePhone)}
                                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 ml-1"
                            >
                                Use {usePhone ? "email" : "phone number"} instead →
                            </button>
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                            <input
                                type={showPw ? "text" : "password"}
                                required
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full pl-10 pr-11 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        {/* Confirm password — signup only */}
                        <AnimatePresence>
                            {isSignup && (
                                <motion.div
                                    key="confirm"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
                                        <input
                                            type="password"
                                            required={isSignup}
                                            placeholder="Confirm Password"
                                            value={confirm}
                                            onChange={e => setConfirm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Forgot password — login only */}
                        {!isSignup && (
                            <div className="text-right">
                                <a href="/forgot-password" className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || done}
                            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-80 text-white font-semibold text-base shadow-lg shadow-indigo-300/40 transition-all hover:-translate-y-0.5 active:translate-y-0 mt-1"
                        >
                            {done ? (
                                <><CheckCircle2 className="h-5 w-5" /> Redirecting…</>
                            ) : loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>
                                    {isSignup ? "Create Account" : `Login as ${role === "student" ? "Student" : "Parent"}`}
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

/* ════════════════════════════════════════════
   LANDING PAGE
════════════════════════════════════════════ */
export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-indigo-100">

            {/* ── Minimal top bar ── */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">C+</div>
                        <span className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">ClassPlus</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#stories" className="hover:text-indigo-600 transition-colors">Stories</a>
                        <a href="/courses" className="hover:text-indigo-600 transition-colors">Courses</a>
                    </nav>
                </div>
            </header>

            {/* ── Hero — split layout ── */}
            <section className="relative flex-1 flex items-center py-16 md:py-24 overflow-hidden">
                {/* blobs */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-purple-100/60 blur-3xl" />
                    <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-indigo-50/80 blur-3xl" />
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left — pitch */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 bg-white border border-indigo-100 rounded-full px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
                                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse inline-block" />
                                New batches starting soon!
                            </div>

                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                                Master Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                                    Dream Career
                                </span>
                            </h1>

                            <p className="text-xl text-gray-500 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                India&apos;s most loved learning platform — live classes, doubt sessions, and expert mentorship all in one place.
                            </p>

                            {/* social proof */}
                            <div className="flex items-center gap-6 justify-center lg:justify-start">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/80?img=${i + 10}`} alt="" className="h-10 w-10 rounded-full border-2 border-white shadow" />
                                    ))}
                                </div>
                                <div>
                                    <div className="flex gap-0.5 text-yellow-400">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                                    <p className="text-sm font-semibold text-gray-600 mt-0.5">Trusted by 2M+ Students</p>
                                </div>
                            </div>

                            {/* mini stats */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: CirclePlay, label: "Live/day", val: "100+" },
                                    { icon: BookOpen, label: "Educators", val: "500+" },
                                    { icon: Users, label: "Students", val: "5M+" },
                                ].map(s => (
                                    <div key={s.label} className="rounded-2xl bg-gray-50 border border-gray-100 p-4 text-center">
                                        <s.icon className="h-5 w-5 text-indigo-500 mx-auto mb-1" />
                                        <p className="font-extrabold text-gray-900 text-lg leading-none">{s.val}</p>
                                        <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Auth card */}
                        <motion.div
                            initial={{ opacity: 0, x: 32 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <AuthCard />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Stories section ── */}
            <section id="stories" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Student Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Ananya Sharma", role: "JEE Advanced AIR 45", img: "https://i.pravatar.cc/150?img=5", q: "The 24/7 doubt support was a game changer. Couldn't have cracked JEE without ClassPlus." },
                            { name: "Rahul Verma", role: "NEET Top Ranker", img: "https://i.pravatar.cc/150?img=11", q: "Live interactions with teachers made complex topics incredibly easy to understand." },
                            { name: "Priya Patel", role: "Cleared UPSC CSE", img: "https://i.pravatar.cc/150?img=9", q: "Daily targets and mentorship helped me stay consistent throughout my UPSC prep." },
                        ].map((s, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <Quote className="h-8 w-8 text-indigo-200 mb-5" />
                                <p className="text-gray-600 leading-relaxed italic mb-6">&ldquo;{s.q}&rdquo;</p>
                                <div className="flex items-center gap-3">
                                    <img src={s.img} alt={s.name} className="h-11 w-11 rounded-full object-cover" />
                                    <div>
                                        <p className="font-bold text-gray-900">{s.name}</p>
                                        <p className="text-sm text-indigo-600 font-medium">{s.role}</p>
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
