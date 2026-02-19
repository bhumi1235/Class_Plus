"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/Button";
import { Search, BookOpen, Layers, Sparkles } from "lucide-react";
import { useAuth } from "@/store/useAuth";
import { useAuthModal } from "@/store/useAuthModal";

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

    if (!isAuthenticated) {
        return null;
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

                {/* Course Grid */}
                <div className="min-h-[400px]">
                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
