"use client";

import { X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthModal } from "@/store/useAuthModal";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const NAV_LINKS = [
    { label: "Home", href: "/dashboard" },
    { label: "Courses", href: "/courses" },
    { label: "Live", href: "/live" },
    { label: "Doubt", href: "/doubt" },
    { label: "Profile", href: "/profile" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { openLogin, openSignup } = useAuthModal();

    const handleLogin = () => {
        onClose();
        openLogin();
    };

    const handleSignup = () => {
        onClose();
        openSignup();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 bg-white"
                >
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                                    C+
                                </div>
                                <span className="font-bold text-xl text-gray-900">ClassPlus</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                <X className="h-6 w-6 text-gray-500" />
                            </Button>
                        </div>

                        {/* Links */}
                        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={onClose}
                                    className="flex items-center justify-between p-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                                >
                                    {link.label}
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Link>
                            ))}
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 border-t border-gray-100 space-y-3">
                            <Button onClick={handleLogin} variant="outline" className="w-full h-12 text-base border-gray-300 text-gray-700 hover:bg-gray-50">
                                Log In
                            </Button>
                            <Button onClick={handleSignup} className="w-full h-12 text-base bg-indigo-600 hover:bg-indigo-700 text-white">
                                Create Free Account
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
