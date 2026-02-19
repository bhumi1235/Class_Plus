"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/Button";
import { Search, Filter, X, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/store/useAuth";
import { useAuthModal } from "@/store/useAuthModal";
import Link from "next/link";

// Mock Data (Expanded for "My Courses")
const COURSES = [
    {
        id: "1",
        title: "Complete JEE Prep 2026",
        thumbnail: "https://images.unsplash.com/photo-1620912189863-010350284897?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
        instructor: "Expert Engineering Team",
        price: 3499,
        originalPrice: 4999,
        rating: 4.9,
        students: 15400,
        duration: "12 Months",
        isLive: true,
        level: "Class 12",
        daysLeft: 5,
        category: "JEE"
    },
    {
        id: "2",
        title: "NEET Success Batch 2026",
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        instructor: "Top Medical Faculty",
        price: 3999,
        originalPrice: 5999,
        rating: 4.8,
        students: 22000,
        duration: "12 Months",
        isLive: true,
        level: "Class 11",
        daysLeft: 2,
        category: "NEET"
    },
    {
        id: "3",
        title: "UPSC CSE 2026 Foundation",
        thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        instructor: "Top IAS Officers",
        price: 9999,
        originalPrice: 19999,
        rating: 4.7,
        students: 5000,
        duration: "18 Months",
        isLive: false,
        level: "Graduate",
        category: "UPSC"
    },
    {
        id: "4",
        title: "Full Stack Web Development",
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1631&q=80",
        instructor: "Hitesh Choudhary",
        price: 2999,
        originalPrice: 6999,
        rating: 4.9,
        students: 12000,
        duration: "6 Months",
        isLive: true,
        level: "Beginner",
        daysLeft: 10,
        category: "Coding"
    },
    {
        id: "5",
        title: "GATE CSE 2026 - Elite",
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        instructor: "GATE Experts Team",
        price: 5999,
        originalPrice: 9999,
        rating: 4.8,
        students: 8000,
        duration: "12 Months",
        isLive: false,
        level: "Engineering",
        category: "GATE"
    },
    {
        id: "6",
        title: "MBA Comprehensive 2025",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1630&q=80",
        instructor: "Top MBA Faculty",
        price: 4999,
        originalPrice: 8999,
        rating: 4.6,
        students: 3000,
        duration: "8 Months",
        isLive: true,
        level: "Graduate",
        daysLeft: 15,
        category: "MBA"
    }
];

const CATEGORIES = ["All", "JEE", "NEET", "UPSC", "GATE", "Coding", "MBA"];

export default function CoursesPage() {
    const { isAuthenticated } = useAuth();
    const { openLogin } = useAuthModal();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"all" | "my">("all");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    // Auth Check
    useEffect(() => {
        if (!isAuthenticated) {
            // Option 1: Redirect to home
            // router.push("/");
            // openLogin(); // And open login

            // Option 2: Show a restricted view or just redirect. 
            // The prompt says "only visible after logging", so we redirect.
            const timeout = setTimeout(() => {
                router.push("/");
                openLogin();
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isAuthenticated, router, openLogin]);

    if (!isAuthenticated) {
        return null; // Or a loading spinner while redirecting
    }

    // Mock enrolled courses (Subset of COURSES)
    const myCourses = COURSES.slice(0, 2).map(c => ({ ...c, isEnrolled: true }));

    const displayCourses = activeTab === "all" ? COURSES : myCourses;

    const filteredCourses = displayCourses.filter(course => {
        const matchesCategory = activeCategory === "All" || course.category === activeCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">

                {/* Header Section */}
                <div className="mb-8 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
                            <p className="text-gray-600">Manage your learning and explore new skills.</p>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white p-1 rounded-xl border border-gray-200 inline-flex shadow-sm">
                            <button
                                onClick={() => setActiveTab("all")}
                                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "all"
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <BookOpen className="h-4 w-4" />
                                All Courses
                            </button>
                            <button
                                onClick={() => setActiveTab("my")}
                                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === "my"
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <Layers className="h-4 w-4" />
                                My Courses
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Filter Toggle (Mobile) */}
                        <Button variant="outline" className="md:hidden w-full" onClick={() => setShowFilters(!showFilters)}>
                            <Filter className="h-4 w-4 mr-2" /> Filters
                        </Button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters (Desktop) - Only show for All Courses */}
                    {activeTab === "all" && (
                        <aside className="hidden md:block w-64 shrink-0 space-y-8">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Filter className="h-4 w-4" /> Filters
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-500 mb-2">Categories</p>
                                    {CATEGORIES.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setActiveCategory(category)}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${activeCategory === category
                                                ? "bg-indigo-600 text-white font-medium"
                                                : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    )}

                    {/* Course Grid */}
                    <div className="flex-1">
                        {/* Mobile Filter Sheet */}
                        <AnimatePresence>
                            {showFilters && activeTab === "all" && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="md:hidden mb-6 overflow-hidden"
                                >
                                    <div className="bg-white p-4 rounded-xl border border-gray-200">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-semibold">Categories</h3>
                                            <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {CATEGORIES.map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => { setActiveCategory(category); setShowFilters(false); }}
                                                    className={`px-3 py-1.5 rounded-full text-sm border ${activeCategory === category
                                                        ? "bg-indigo-600 text-white border-indigo-600"
                                                        : "border-gray-200 text-gray-600"
                                                        }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {filteredCourses.length > 0 ? (
                            <div className={`grid grid-cols-1 sm:grid-cols-2 ${activeTab === 'all' ? 'lg:grid-cols-3' : 'lg:grid-cols-3'} gap-6`}>
                                {filteredCourses.map(course => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        isEnrolled={activeTab === 'my'}
                                        href={`/courses/${course.id}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                                    <Search className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">No courses found</h3>
                                <p className="text-gray-500">
                                    {activeTab === 'my'
                                        ? "You haven't enrolled in any courses yet."
                                        : "Try adjusting your search or filters."}
                                </p>
                                {activeTab === 'all' ? (
                                    <Button
                                        variant="link"
                                        className="mt-2 text-indigo-600"
                                        onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                                    >
                                        Clear all filters
                                    </Button>
                                ) : (
                                    <Button
                                        variant="link"
                                        className="mt-2 text-indigo-600"
                                        onClick={() => setActiveTab("all")}
                                    >
                                        Browse All Courses
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
