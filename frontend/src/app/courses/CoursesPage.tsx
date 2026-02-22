"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/Button";
import { Search, BookOpen, Layers, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { useAuthModal } from "@/store/useAuthModal";
import { useCoursePageData } from "@/lib/courseData";

const CATEGORIES = ["All", "JEE", "NEET", "UPSC", "GATE", "Coding", "MBA"];

export default function CoursesPage() {
    const { isAuthenticated } = useAuth();
    const { openLogin } = useAuthModal();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"all" | "my">("all");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Auth Check
    useEffect(() => {
        if (!isAuthenticated) {
            const timeout = setTimeout(() => {
                router.push("/");
                openLogin();
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [isAuthenticated, router, openLogin]);

    const { courses, enrolledIds, loading, error, refetch } = useCoursePageData();

    if (!isAuthenticated) {
        return null;
    }

    // My Courses: only enrolled ones
    const myCourses = courses.filter(c => enrolledIds.includes(c.id));
    const displayCourses = activeTab === "all" ? courses : myCourses;

    const filteredCourses = displayCourses.filter(course => {
        const matchesCategory = activeCategory === "All" || course.category === activeCategory;
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50/50 flex flex-col font-sans">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">

                {/* Header & Tabs */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            {activeTab === 'all' ? 'Explore Courses' : 'My Learning'}
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">
                            {activeTab === 'all' ? 'Discover new skills and reach your goals' : 'Continue where you left off'}
                        </p>
                    </div>

                    <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex shadow-inner">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "all"
                                ? "bg-white text-indigo-600 shadow-md transform scale-105"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                        >
                            <BookOpen className="h-4 w-4" />
                            All Courses
                        </button>
                        <button
                            onClick={() => setActiveTab("my")}
                            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "my"
                                ? "bg-white text-indigo-600 shadow-md transform scale-105"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                }`}
                        >
                            <Layers className="h-4 w-4" />
                            My Courses
                        </button>
                    </div>
                </div>

                {/* Search & Categories (Only for All Courses) */}
                {activeTab === "all" && (
                    <div className="mb-12 space-y-8">
                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for courses, topics, or exams..."
                                className="w-full h-14 pl-12 pr-6 rounded-2xl border-2 border-transparent bg-white shadow-lg shadow-gray-200/50 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all text-gray-900 placeholder:text-gray-400 text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border ${activeCategory === category
                                        ? "bg-gray-900 text-white border-gray-900 shadow-lg transform -translate-y-0.5"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                        }`}
                                >
                                    {category === "All" && <Sparkles className="h-3 w-3 inline-block mr-2 text-yellow-500" />}
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error banner when API failed but we have fallback courses */}
                {error && courses.length > 0 && (
                    <div className="mb-6 flex items-center justify-between gap-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                        <p className="text-sm text-amber-800">Couldn&apos;t reach server. Showing sample courses.</p>
                        <Button variant="outline" size="sm" onClick={() => refetch()}>Try again</Button>
                    </div>
                )}

                {/* Course Grid */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24">
                            <Loader2 className="h-12 w-12 animate-spin text-indigo-500 mb-4" />
                            <p className="text-gray-500">Loading courses…</p>
                        </div>
                    ) : error && courses.length === 0 ? (
                        <div className="text-center py-24">
                            <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Could not load courses</h3>
                            <p className="text-gray-500 mb-4">{error}</p>
                            <Button onClick={() => refetch()}>Try again</Button>
                        </div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map(course => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    isEnrolled={enrolledIds.includes(course.id)}
                                    href={`/courses/${course.id}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                We couldn't find any courses matching your search. Try different keywords or categories.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                            >
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
