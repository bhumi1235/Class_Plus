"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    FileText,
    BarChart,
    Settings,
    LogOut,
    ChevronLeft,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: GraduationCap, label: "My Batches", href: "/my-batches" },
    { icon: BookOpen, label: "Study Material", href: "/study-material" },
    { icon: FileText, label: "Test Series", href: "/test-series" },
    { icon: BarChart, label: "Results", href: "/results" },
    { icon: Settings, label: "Settings", href: "/settings" },
];

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
                    collapsed ? "w-20" : "w-72",
                    mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    <Link href="/" className={cn("flex items-center gap-2 overflow-hidden", collapsed && "justify-center w-full")}>
                        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xl">
                            C+
                        </div>
                        {!collapsed && (
                            <span className="font-bold text-xl text-gray-900 truncate">ClassPlus</span>
                        )}
                    </Link>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
                    </button>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 font-medium"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5 flex-shrink-0 transition-colors", isActive ? "text-indigo-600" : "text-gray-500 group-hover:text-gray-700")} />
                                {!collapsed && (
                                    <span>{item.label}</span>
                                )}
                                {/* Tooltip for collapsed state */}
                                {collapsed && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100">
                    <div className={cn("flex items-center gap-3 p-2 rounded-xl bg-gray-50", collapsed && "justify-center p-0 bg-transparent")}>
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                            U
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">User Name</p>
                                <p className="text-xs text-gray-500 truncate">Student</p>
                            </div>
                        )}
                        {!collapsed && (
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                                <LogOut className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </>
    );
}
