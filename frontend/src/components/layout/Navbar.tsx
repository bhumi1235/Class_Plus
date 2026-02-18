"use client";
// Force redeploy

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Search, Menu, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { ClassSelector } from "./ClassSelector";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";
import { useAuthModal } from "@/store/useAuthModal";
import { useAuth } from "@/store/useAuth";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
    const { openLogin, openSignup } = useAuthModal();
    const { isAuthenticated, user, logout } = useAuth();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        router.push("/");
    };

    const NAV_LINKS = [
        { label: "Home", href: "/dashboard" },
        { label: "Courses", href: "/courses" },
        { label: "Live", href: "/live" },
        { label: "Doubt", href: "/doubt" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md transition-all duration-200 border-b",
                    scrolled ? "h-16 shadow-indigo-100/50 shadow-lg border-indigo-50" : "h-[72px] border-transparent"
                )}
            >
                <div className="container mx-auto h-full px-4 md:px-6 lg:px-8 flex items-center">

                    {/* LEFT: Logo */}
                    <div className="flex-none">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-indigo-200 shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-3">
                                C+
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">ClassPlus</span>
                        </Link>
                    </div>

                    {/* CENTER: Navigation Links */}
                    <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
                        <div className="flex items-center gap-1 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-5 py-2 rounded-full text-[15px] font-medium text-gray-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex-none flex items-center gap-3 ml-auto lg:ml-0">

                        {isAuthenticated ? (
                            <div className="hidden md:block relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1.5 pr-4 rounded-full border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                                >
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md ring-2 ring-white">
                                        {user?.name.charAt(0) || 'S'}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">
                                        {user?.name.split(' ')[0] || 'Student'}
                                    </span>
                                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <>
                                            <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.1 }}
                                                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-indigo-100 border border-gray-100 py-2 z-40 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-50 text-center bg-gray-50/50">
                                                    <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                </div>

                                                <div className="p-2 space-y-1">
                                                    <Link
                                                        href="/settings"
                                                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                        onClick={() => setIsProfileOpen(false)}
                                                    >
                                                        <User className="h-4 w-4" />
                                                        My Profile
                                                    </Link>
                                                    <Link
                                                        href="/settings"
                                                        className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                                        onClick={() => setIsProfileOpen(false)}
                                                    >
                                                        <Settings className="h-4 w-4" />
                                                        Settings
                                                    </Link>
                                                    <div className="h-px bg-gray-100 my-1 mx-2" />
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                                                    >
                                                        <LogOut className="h-4 w-4" />
                                                        Logout
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* Login Button */
                            <div className="hidden md:flex items-center gap-3">
                                <Button
                                    variant="ghost"
                                    className="text-gray-600 hover:text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl px-4"
                                    onClick={openLogin}
                                >
                                    Log in
                                </Button>
                                <Button
                                    onClick={openSignup}
                                    className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-indigo-300 font-medium px-6 h-10"
                                >
                                    Sign Up Free
                                </Button>
                            </div>
                        )}

                        {/* Mobile Hamburger */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMobileOpen(true)}
                        >
                            <Menu className="h-6 w-6 text-gray-700" />
                        </Button>
                    </div>
                </div>
            </nav>

            <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
        </>
    );
}
