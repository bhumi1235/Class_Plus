"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <Button variant="ghost" size="icon" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={onMenuClick}>
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <Button variant="ghost" size="icon" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                    </Button>
                    <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />
                    <div className="flex items-center gap-x-2 lg:gap-x-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            JD
                        </div>
                        <span className="hidden lg:flex lg:items-center">
                            <span className="ml-1 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                John Doe
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}
