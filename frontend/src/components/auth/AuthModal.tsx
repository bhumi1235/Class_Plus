"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, ArrowRight, Smartphone, MapPin, Phone } from "lucide-react";
import { useAuthModal } from "@/store/useAuthModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function AuthModal() {
    const { isOpen, view, close, openLogin, openSignup, openForgotPassword } = useAuthModal();
    const [isPhoneAuth, setIsPhoneAuth] = useState(false);
    const [step, setStep] = useState<'request' | 'otp' | 'reset'>('request');

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            // Reset state on close
            setTimeout(() => setStep('request'), 300);
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const toggleAuthMethod = () => setIsPhoneAuth(!isPhoneAuth);

    const handleSendOTP = () => {
        // Simulate API call
        setStep('otp');
    };

    const handleVerifyOTP = () => {
        // Simulate OTP verification
        setStep('reset');
    };

    const handleResetPassword = () => {
        // Simulate password reset
        openLogin();
        setStep('request');
    };

    const getTitle = () => {
        if (view === 'login') return 'Welcome Back!';
        if (view === 'signup') return 'Create Account';
        if (view === 'forgot-password') return 'Reset Password';
        return '';
    };

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
                        className={`relative w-full ${view === 'signup' ? 'max-w-2xl' : view === 'forgot-password' ? 'max-w-[480px]' : 'max-w-[440px]'} bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]`}
                    >
                        {/* Close Button */}
                        <button
                            onClick={close}
                            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <div className="p-8 pt-10 overflow-y-auto scrollbar-hide">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xl mb-4 shadow-indigo-200 shadow-lg">
                                    C+
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    {getTitle()}
                                </h2>

                                {/* Login Toggle (Moved below Welcome) */}
                                {view === 'login' && (
                                    <div className="mt-3 flex justify-center">
                                        <button
                                            type="button"
                                            onClick={toggleAuthMethod}
                                            className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                                        >
                                            Use {isPhoneAuth ? 'Email' : 'Phone'} instead
                                        </button>
                                    </div>
                                )}

                                <p className="text-gray-500 mt-2 text-sm">
                                    {view === 'login' && 'Continue your learning journey with ClassPlus'}
                                    {view === 'signup' && 'Join thousands of students learning on ClassPlus'}
                                    {view === 'forgot-password' && 'Enter your details to verify it\'s you'}
                                </p>
                            </div>

                            {/* Form */}
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

                                {/* SIGNUP FORM */}
                                {view === 'signup' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Student Info */}
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Full Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input placeholder="Student Name" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input type="email" placeholder="student@example.com" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Phone Number</label>
                                            <div className="relative">
                                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input placeholder="98765 43210" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>

                                        {/* Parent Info */}
                                        <div className="space-y-1.5 md:col-span-2 pt-2 border-t border-gray-100 mt-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Parent Details</p>
                                        </div>
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Parent Name</label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input placeholder="Parent Name" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Parent Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input type="email" placeholder="parent@example.com" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Parent Phone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input placeholder="Parent Phone" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>

                                        {/* Address & Password */}
                                        <div className="space-y-1.5 md:col-span-2 pt-2 border-t border-gray-100 mt-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Security & Address</p>
                                        </div>
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Address</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                <textarea
                                                    placeholder="Full Address"
                                                    className="w-full pl-10 p-3 h-20 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input type="password" placeholder="••••••••" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-700 ml-1">Confirm Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                <Input type="password" placeholder="••••••••" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                            </div>
                                        </div>
                                        <Button className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-200 mt-2">
                                            Create Account
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                )}

                                {/* LOGIN FORM */}
                                {view === 'login' && (
                                    <>
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
                                                    className={`h-11 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl ${isPhoneAuth ? 'pl-24' : 'pl-10'}`}
                                                />
                                                {isPhoneAuth && (
                                                    <div className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center h-full">
                                                        <span className="text-gray-500 text-sm font-medium border-r border-gray-300 pr-2 mr-2 h-5 flex items-center">
                                                            +91
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between ml-1">
                                                <label className="text-xs font-semibold text-gray-700">Password</label>
                                                <button
                                                    type="button"
                                                    onClick={openForgotPassword}
                                                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700"
                                                >
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
                                        <Button className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-lg shadow-indigo-200 mt-2">
                                            Login
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </>
                                )}

                                {/* FORGOT PASSWORD FORM */}
                                {view === 'forgot-password' && (
                                    <>
                                        {step === 'request' && (
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-gray-700 ml-1">Email or Phone</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <Input placeholder="Enter your registered email or phone" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={handleSendOTP}
                                                    className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg"
                                                >
                                                    Send OTP
                                                </Button>
                                            </div>
                                        )}

                                        {step === 'otp' && (
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-gray-700 ml-1">Enter 6-digit OTP</label>
                                                    <div className="flex gap-2 justify-center">
                                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                                            <Input key={i} className="w-10 h-12 text-center text-lg font-bold bg-gray-50 border-gray-200 rounded-lg p-0" maxLength={1} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={handleVerifyOTP}
                                                    className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg"
                                                >
                                                    Verify OTP
                                                </Button>
                                                <button
                                                    onClick={() => setStep('request')}
                                                    className="w-full text-center text-xs font-medium text-gray-500 hover:text-gray-900"
                                                >
                                                    Resend OTP or Change number
                                                </button>
                                            </div>
                                        )}

                                        {step === 'reset' && (
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-gray-700 ml-1">New Password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <Input type="password" placeholder="New Password" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold text-gray-700 ml-1">Confirm New Password</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                                        <Input type="password" placeholder="Confirm New Password" className="pl-10 h-11 bg-gray-50 border-gray-200 rounded-xl" />
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={handleResetPassword}
                                                    className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg"
                                                >
                                                    Reset Password
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </form>

                            {/* Footer Switcher */}
                            <div className="mt-6 text-center text-sm text-gray-500">
                                {view === 'login' && (
                                    <>
                                        Don't have an account?{' '}
                                        <button onClick={openSignup} className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                                            Sign Up
                                        </button>
                                    </>
                                )}
                                {view === 'signup' && (
                                    <>
                                        Already have an account?{' '}
                                        <button onClick={openLogin} className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                                            Log In
                                        </button>
                                    </>
                                )}
                                {view === 'forgot-password' && (
                                    <button onClick={openLogin} className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                                        Back to Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
