"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Search, Menu, User } from "lucide-react";
import { ClassSelector } from "./ClassSelector";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                            {[
                                { label: "Courses", href: "/courses" },
                                { label: "Batches", href: "/my-batches" },
                                { label: "Test Series", href: "/test-series" },
                                { label: "Scholarships", href: "/scholarships" },
                            ].map(link => (
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

                        {/* Login Button */}
                        <Link href="/auth/login" className="hidden md:block">
                            <Button className="rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md shadow-indigo-100 transition-all hover:shadow-lg font-medium px-5">
                                Login
                            </Button>
                        </Link>

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
