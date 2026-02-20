"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, CirclePlay, Users, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/store/useAuth";
import { useAuthModal } from "@/store/useAuthModal";
import { useRouter } from "next/navigation";


export default function LandingPage() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const { openLogin } = useAuthModal();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/dashboard");
        }
    }, [isAuthenticated, router]);

    // Don't render while redirecting
    if (isAuthenticated) return null;

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
                                <ProtectedButton onClick={() => router.push("/courses")} className="w-full sm:w-auto">
                                    <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-8 text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                        Explore Courses
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </ProtectedButton>
                                <ProtectedButton
                                    onClick={() => {
                                        // Placeholder for Demo action
                                        console.log("Watch Demo clicked");
                                    }}
                                    className="w-full sm:w-auto"
                                >
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-2xl h-14 px-8 text-lg text-gray-600"
                                    >
                                        <CirclePlay className="mr-2 h-5 w-5 text-indigo-500" />
                                        Watch Demo
                                    </Button>
                                </ProtectedButton>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-gray-100/50">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-12 w-12 rounded-full border-4 border-white bg-gray-200 bg-cover bg-center shadow-md" style={{ backgroundImage: `url('https://i.pravatar.cc/100?img=${i + 10}')` }} />
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

                        {/* Image/Visual - Floating Cards Removed */}
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

            {/* Student Stories Section (Replaces Popular Courses) */}
            <section className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Inspiring Student Stories</h2>
                        <p className="text-lg text-gray-500">Hear from our students who have transformed their careers and achieved their dreams with us.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Ananya Sharma",
                                role: "JEE Advanced AIR 45",
                                image: "https://i.pravatar.cc/150?img=5",
                                quote: "The structured curriculum and 24/7 doubt support were game changers for me. I couldn't have cracked JEE without ClassPlus."
                            },
                            {
                                name: "Rahul Verma",
                                role: "NEET Top Ranker",
                                image: "https://i.pravatar.cc/150?img=11",
                                quote: "Live interactions with teachers made complex topics so easy to understand. The mock tests were exactly like the real exam."
                            },
                            {
                                name: "Priya Patel",
                                role: "Cleared UPSC CSE",
                                image: "https://i.pravatar.cc/150?img=9",
                                quote: "Consistency is key for UPSC, and ClassPlus helped me stay consistent with their daily targets and mentorship program."
                            }
                        ].map((story, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <Quote className="h-10 w-10 text-indigo-200 mb-6" />
                                <p className="text-gray-600 mb-8 leading-relaxed italic">"{story.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={story.image} alt={story.name} className="h-12 w-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                                        <p className="text-sm text-indigo-600 font-medium">{story.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/success-stories" passHref>
                            <Button variant="outline" className="h-12 px-8 rounded-xl text-base border-gray-300">
                                View More Stories
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function ProtectedButton({ onClick, children, className }: { onClick: () => void, children: React.ReactNode, className?: string }) {
    const { isAuthenticated } = useAuth();
    const { openLogin } = useAuthModal();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isAuthenticated) {
            onClick();
        } else {
            openLogin();
        }
    };

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    );
}
