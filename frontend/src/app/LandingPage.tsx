"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, CirclePlay, Users, BookOpen, Quote } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-indigo-100 selection:text-indigo-700">
            <Navbar />

            {/* Hero */}
            <section className="relative overflow-hidden pt-16 pb-24 md:pt-32 md:pb-40">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-100/50 blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/60 blur-3xl" />
                </div>

                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto text-center space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-indigo-100 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                            New Batches starting soon!
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl leading-[1.1]">
                            Master Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                                Dream Career
                            </span>
                        </h1>

                        <p className="text-xl text-gray-500 leading-relaxed">
                            Join India&apos;s most loved learning platform. Interactive live classes, personalized mentorship, and comprehensive study material designed for your success.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/auth/login">
                                <Button size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-8 text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                                    Log In
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/auth/signup">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-2xl h-14 px-8 text-lg text-gray-700">
                                    Sign Up Free
                                </Button>
                            </Link>
                        </div>

                        {/* Social proof */}
                        <div className="flex items-center justify-center gap-8 pt-4 border-t border-gray-100/50">
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
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-4 w-4 fill-current" />)}
                                </div>
                                <p className="text-sm font-semibold text-gray-600">Trusted by 2M+ Students</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white py-16 border-y border-gray-100/50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Daily Live Classes", value: "100+", icon: CirclePlay },
                            { label: "Trusted Students", value: "5 Million+", icon: Users },
                            { label: "Top Educators", value: "500+", icon: BookOpen },
                            { label: "Video Lectures", value: "50k+", icon: Star },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-gray-50 transition-colors">
                                <div className="mb-4 rounded-2xl bg-indigo-50 p-4 text-indigo-600">
                                    <stat.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</h3>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stories */}
            <section className="py-24 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Inspiring Student Stories</h2>
                        <p className="text-lg text-gray-500">Hear from students who transformed their careers with ClassPlus.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Ananya Sharma", role: "JEE Advanced AIR 45", image: "https://i.pravatar.cc/150?img=5", quote: "The structured curriculum and 24/7 doubt support were game changers. I couldn't have cracked JEE without ClassPlus." },
                            { name: "Rahul Verma", role: "NEET Top Ranker", image: "https://i.pravatar.cc/150?img=11", quote: "Live interactions with teachers made complex topics so easy to understand. The mock tests were exactly like the real exam." },
                            { name: "Priya Patel", role: "Cleared UPSC CSE", image: "https://i.pravatar.cc/150?img=9", quote: "Consistency is key for UPSC, and ClassPlus helped me stay consistent with daily targets and mentorship." },
                        ].map((story, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                                <Quote className="h-10 w-10 text-indigo-200 mb-6" />
                                <p className="text-gray-600 mb-8 leading-relaxed italic">&ldquo;{story.quote}&rdquo;</p>
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
                </div>
            </section>

            <Footer />
        </div>
    );
}
