"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, PlayCircle, Users, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <div className="bg-red-500 text-white text-center py-1 text-xs font-bold">
                DEBUG MODE: V3 (Auth & Nav Updated)
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white pt-16 pb-24 md:pt-24 md:pb-32">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                                New Batches starting soon!
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:leading-tight">
                                India's Most Trusted <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                    Learning Platform
                                </span>
                            </h1>

                            <p className="max-w-xl text-lg text-gray-600">
                                Prepare for JEE, NEET, and Board Exams with India's top educators.
                                Experience interactive live classes, comprehensive study material, and personalized mentorship.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/courses">
                                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 px-8 text-base">
                                        Explore Courses
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="#demo">
                                    <Button variant="outline" size="lg" className="border-2 border-gray-200 hover:bg-gray-50 rounded-xl h-12 px-8 text-base text-gray-700">
                                        <PlayCircle className="mr-2 h-5 w-5 text-indigo-600" />
                                        Watch Demo
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex items-center gap-8 pt-4">
                                <div className="flex -space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 bg-[url('https://i.pravatar.cc/100?img=${i+10}')] bg-cover bg-center" />
                                    ))}
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-indigo-50 text-xs font-bold text-indigo-600">
                                        +2M
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Rated 4.8 by students</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image/Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative lg:h-[600px] hidden md:block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/50 to-purple-200/50 rounded-[40px] rotate-3 blur-2xl" />
                            <div className="relative h-full w-full overflow-hidden rounded-[30px] border-4 border-white shadow-2xl bg-gray-100">
                                {/* Placeholder for Hero Image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
                                    <img
                                        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                                        alt="Students learning"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Floating Cards */}
                                <motion.div
                                    initial={{ y: 20 }}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-10 left-10 rounded-2xl bg-white p-4 shadow-xl border border-gray-100 max-w-[200px]"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                            <Trophy className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Top Result</p>
                                            <p className="font-bold text-gray-900">Excellence</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ y: -20 }}
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute top-10 right-10 rounded-2xl bg-white p-4 shadow-xl border border-gray-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                                            <Users className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Live Learners</p>
                                            <p className="font-bold text-gray-900">15k+</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-12 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Daily Live Classes", value: "100+", icon: PlayCircle },
                            { label: "Trusted Students", value: "5 Million+", icon: Users },
                            { label: "Top Educators", value: "500+", icon: BookOpen },
                            { label: "Video Lectures", value: "50k+", icon: Star },
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                <div className="mb-3 rounded-full bg-indigo-50 p-3 text-indigo-600">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Courses */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
                            <p className="mt-2 text-gray-600">Comprehensive courses for all your learning needs</p>
                        </div>
                        <Link href="/courses" className="hidden md:flex items-center text-indigo-600 font-semibold hover:text-indigo-700">
                            View All Courses <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <CourseCard key={item} />
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/courses">
                            <Button variant="outline" className="w-full">View All Courses</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function CourseCard() {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="aspect-video w-full bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1620912189863-010350284897?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80"
                    alt="Course thumbnail"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                    <span className="inline-block rounded-md bg-indigo-600 px-2 py-1 text-xs font-bold text-white mb-2">
                        Physics Wallah Style
                    </span>
                    <h3 className="text-lg font-bold text-white line-clamp-1">Lakshya JEE 2026</h3>
                </div>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> PCM</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Class 12</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 line-through">₹4,999</p>
                        <p className="text-xl font-bold text-gray-900">₹3,499</p>
                    </div>
                    <Button size="sm" className="rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800">
                        Explore
                    </Button>
                </div>
            </div>
        </div>
    );
}
