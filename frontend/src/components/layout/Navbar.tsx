import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Search, Menu, User, Bell } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-6 w-6" />
                    </Button>
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                            C+
                        </div>
                        <span>ClassPlus</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                        Courses
                    </Link>
                    <Link href="/test-series" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                        Test Series
                    </Link>
                    <Link href="/results" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                        Results
                    </Link>
                    <Link href="/study-material" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                        Study Material
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="text-gray-600">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <Link href="/auth/login">
                        <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
