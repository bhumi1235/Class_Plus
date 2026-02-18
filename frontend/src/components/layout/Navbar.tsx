"use client";

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
                    "sticky top-0 z-40 w-full bg-white transition-all duration-200 border-b",
                    scrolled ? "h-16 shadow-sm border-gray-200" : "h-[72px] border-transparent"
                )}
            >
                <div className="container mx-auto h-full px-4 md:px-6 lg:px-8 flex items-center justify-between">

                    {/* LEFT: Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-indigo-200 shadow-md transition-transform group-hover:scale-105">
                            C+
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">ClassPlus</span>
                    </Link>

                    {/* CENTER: Navigation & Class Selector */}
                    <div className="hidden lg:flex items-center gap-6">

                        <ClassSelector />

                        <div className="h-6 w-px bg-gray-200 mx-2" />

                        <div className="flex items-center gap-6">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-[15px] font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-3">
                        {/* Search Icon (Desktop) */}
                        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                            <Search className="h-5 w-5" />
                            <span className="text-sm font-medium">Search</span>
                        </button>

                        <div className="hidden md:block h-6 w-px bg-gray-200" />

                        {isAuthenticated ? (
                            <div className="hidden md:block relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-gray-200 hover:border-indigo-200 hover:bg-gray-50 transition-all"
                                >
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">
                                        {user?.name.charAt(0) || 'S'}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {user?.name.split(' ')[0] || 'Student'}
                                    </span>
                                    <ChevronDown className="h-4 w-4 text-gray-400" />
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
                                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-40 overflow-hidden"
                                            >
                                                <div className="px-4 py-3 border-b border-gray-50">
                                                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                                </div>
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <User className="h-4 w-4" />
                                                    My Profile
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <Settings className="h-4 w-4" />
                                                    Settings
                                                </Link>
                                                <div className="h-px bg-gray-50 my-1" />
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Logout
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* Login Button */
                            <div className="hidden md:flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    className="text-gray-600 hover:text-indigo-600 font-medium"
                                    onClick={openLogin}
                                >
                                    Log in
                                </Button>
                                <Button
                                    onClick={openSignup}
                                    className="rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md shadow-indigo-100 transition-all hover:shadow-lg font-medium px-5"
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
