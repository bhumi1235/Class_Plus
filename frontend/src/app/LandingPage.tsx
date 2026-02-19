"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, CirclePlay, Users, Trophy, BookOpen, CircleCheck, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { EnrollmentModal } from "@/components/courses/EnrollmentModal";
import { useAuth } from "@/store/useAuth";
import { useAuthModal } from "@/store/useAuthModal";
import { useRouter } from "next/navigation";
import CourseCard, { Course } from "@/components/CourseCard";

// Mock Data (Shared with Courses Page for consistency)
const POPULAR_COURSES: Course[] = [
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
    }
];

export default function LandingPage() {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-100/50 blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/60 blur-3xl" />
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                New Batches starting soon!
                            </div>

                            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:leading-[1.1]">
                                Master Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-text">
                                    Dream Career
                                </span>
                            </h1>

                            <p className="max-w-2xl mx-auto lg:mx-0 text-xl text-gray-500 leading-relaxed">
                                Join India's most loved learning platform. Interactive live classes, personalized mentorship, and comprehensive study material designed for your success.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <ProtectedLink href="/courses" className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-8 text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                        Explore Courses
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </ProtectedLink>
                                <Link href="#demo" className="w-full sm:w-auto">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl h-14 px-8 text-lg text-gray-600">
                                        <CirclePlay className="mr-2 h-5 w-5 text-indigo-500" />
                                        Watch Demo
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-gray-100/50">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`h-12 w-12 rounded-full border-4 border-white bg-gray-200 bg-cover bg-center shadow-md`} style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')` }} />
                                    ))}
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-indigo-50 text-xs font-bold text-indigo-600 shadow-md">
                                        +2M
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-sm font-semibold text-gray-600">Trusted by 2M+ Students</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image/Visual */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative lg:h-[650px] hidden lg:block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-[50px] rotate-6 transform scale-90 blur-xl opacity-60" />
                            <div className="relative h-full w-full overflow-hidden rounded-[40px] border-[12px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-gray-100">
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
                                    <img
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                                        alt="Students learning"
                                        className="h-full w-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                </div>

                                {/* Floating Cards */}
                                <motion.div
                                    initial={{ y: 20 }}
                                    animate={{ y: [0, -12, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-12 left-12 rounded-3xl bg-white/90 backdrop-blur-md p-5 shadow-xl border border-white/50 max-w-[220px]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                                            <Trophy className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Top Result</p>
                                            <p className="font-bold text-gray-900 text-lg">Excellence</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: -20 }}
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute top-12 right-12 rounded-3xl bg-white/90 backdrop-blur-md p-5 shadow-xl border border-white/50"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                                            <Users className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Live Learners</p>
                                            <p className="font-bold text-gray-900 text-lg">15k+</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* Stats Section */}
            <section className="bg-white py-16 border-y border-gray-100/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Daily Live Classes", value: "100+", icon: CirclePlay, color: "text-blue-600", bg: "bg-blue-50" },
                            { label: "Trusted Students", value: "5 Million+", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
                            { label: "Top Educators", value: "500+", icon: BookOpen, color: "text-pink-600", bg: "bg-pink-50" },
                            { label: "Video Lectures", value: "50k+", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
                        ].map((stat, idx) => (
                            <div key={idx} className="group flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 transition-colors cursor-default">
                                <div className={`mb-4 rounded-2xl ${stat.bg} p-4 ${stat.color} transition-transform group-hover:scale-110`}>
                                    <stat.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div className="max-w-xl">
                            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Popular Courses</h2>
                            <p className="mt-3 text-lg text-gray-500">Explore our most rated courses designed by experts to help you crack your exams.</p>
                        </div>
                        <ProtectedLink href="/courses" className="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-700 bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                            View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                        </ProtectedLink>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {POPULAR_COURSES.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onClick={() => setSelectedCourse(course)}
                            />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <ProtectedLink href="/courses">
                            <Button variant="outline" className="w-full h-12 rounded-xl text-base border-gray-300">View All Courses</Button>
                        </ProtectedLink>
                    </div>
                </div>
            </section>

            <EnrollmentModal
                isOpen={!!selectedCourse}
                onClose={() => setSelectedCourse(null)}
                courseCode={selectedCourse?.id || ""}
                price={selectedCourse?.price || 0}
                courseTitle={selectedCourse?.title || ""}
            />

            <Footer />
        </div>
    );
}

function ProtectedLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
    const { isAuthenticated } = useAuth();
    const { openLogin } = useAuthModal();
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isAuthenticated) {
            router.push(href);
        } else {
            openLogin();
        }
    };

    return (
        <a href={href} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
