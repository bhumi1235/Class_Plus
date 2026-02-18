"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Smartphone } from "lucide-react";
import { useAuthModal } from "@/store/useAuthModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export function AuthModal() {
    const { isOpen, view, close, openLogin, openSignup } = useAuthModal();
    const [isPhoneAuth, setIsPhoneAuth] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleAuthMethod = () => setIsPhoneAuth(!isPhoneAuth);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-[440px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={close}
                            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-8 pt-10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xl mb-4 shadow-indigo-200 shadow-lg">
                                    C+
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    {view === 'login' ? 'Welcome Back!' : 'Create Account'}
                                </h2>
                                <p className="text-gray-500 mt-2 text-sm">
                                    {view === 'login'
                                        ? 'Continue your learning journey with ClassPlus'
                                        : 'Join thousands of students learning on ClassPlus'}
                                </p>
                            </div>

                            {/* Form */}
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                {view === 'signup' && (
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold text-gray-700 ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                placeholder="John Doe"
                                                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-gray-700 ml-1">
                                        {isPhoneAuth ? 'Phone Number' : 'Email Address'}
                                    </label>
                                    <div className="relative">
                                        {isPhoneAuth ? (
                                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        )}
                                        <Input
                                            type={isPhoneAuth ? 'tel' : 'email'}
                                            placeholder={isPhoneAuth ? '98765 43210' : 'john@example.com'}
                                            className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl"
                                        />
                                        {isPhoneAuth && (
                                            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium border-r pr-2 mr-2 border-gray-300 h-5 flex items-center">
                                                +91
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleAuthMethod}
                                        className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 ml-1"
                                    >
                                        Use {isPhoneAuth ? 'Email' : 'Phone'} instead
                                    </button>
                                </div>

                                {view === 'login' && (
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between ml-1">
                                            <label className="text-xs font-semibold text-gray-700">Password</label>
                                            <button type="button" className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700">
                                                Forgot Password?
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                )}

                                <Button className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-200 mt-2">
                                    {view === 'login' ? 'Login' : 'Create Account'}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>

                            {/* Footer Switcher */}
                            <div className="mt-6 text-center text-sm text-gray-500">
                                {view === 'login' ? (
                                    <>
                                        Don't have an account?{' '}
                                        <button onClick={openSignup} className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                                            Sign Up
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <button onClick={openLogin} className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                                            Log In
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Social Login / Separator (Optional) */}
                        <div className="bg-gray-50/80 p-4 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-400 font-medium">Trusted by 10,000+ students</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
