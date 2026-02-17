"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu } from "lucide-react";

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-full bg-gray-50">
            {/* Mobile Trigger */}
            <div className="lg:hidden fixed top-3 left-3 z-50">
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)} className="bg-white/80 backdrop-blur-sm shadow-sm">
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* Main Content Area */}
            <div className={cn(
                "transition-all duration-300 min-h-screen flex flex-col",
                collapsed ? "lg:pl-20" : "lg:pl-72"
            )}>
                {/* Navbar */}
                <div className="sticky top-0 z-30">
                    <Navbar />
                </div>

                {/* Content */}
                <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
