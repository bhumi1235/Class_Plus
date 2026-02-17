"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    HelpCircle,
    Settings,
    LogOut,
    GraduationCap
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Live Classes", href: "/live", icon: Calendar },
    { name: "Doubts", href: "/doubt", icon: HelpCircle },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r border-gray-200 bg-white lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
                        <GraduationCap className="h-8 w-8" />
                        <span>ClassPlus</span>
                    </Link>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    isActive
                                                        ? "bg-indigo-50 text-indigo-600"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                                                    "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200"
                                                )}
                                            >
                                                <item.icon
                                                    className={cn(
                                                        isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-indigo-600",
                                                        "h-6 w-6 shrink-0 transition-colors duration-200"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                        <li className="mt-auto">
                            <Link
                                href="/logout"
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                            >
                                <LogOut
                                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-red-600 transition-colors duration-200"
                                    aria-hidden="true"
                                />
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
