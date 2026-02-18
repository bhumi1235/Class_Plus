"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnrollmentModal } from "@/components/courses/EnrollmentModal";
import { useState } from "react";
import { useParams } from "next/navigation";

// Mock Data
const CLASS_DATA: Record<string, { title: string; description: string }> = {
    "class-9": { title: "Class 9", description: "Build a strong foundation for your future." },
    "class-10": { title: "Class 10", description: "Ace your Board Exams with expert guidance." },
    "class-11": { title: "Class 11", description: "Start your JEE/NEET preparation early." },
    "class-12": { title: "Class 12", description: "Master Boards and Competitive Exams together." },
    "dropper": { title: "Dropper / JEE", description: "Dedicated batch for JEE Main & Advanced success." },
};

const SUBJECTS = [
    { id: "physics", name: "Physics", icon: "⚛️", color: "bg-blue-100 text-blue-700" },
    { id: "chemistry", name: "Chemistry", icon: "🧪", color: "bg-purple-100 text-purple-700" },
    { id: "maths", name: "Mathematics", icon: "📐", color: "bg-indigo-100 text-indigo-700" },
    { id: "biology", name: "Biology", icon: "🧬", color: "bg-green-100 text-green-700" },
];

export default function ClassPage() {
    const params = useParams();
    const classId = params.classId as string;
    const classInfo = CLASS_DATA[classId] || { title: "Class Details", description: "Explore courses for your class." };

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 bg-indigo-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
                            Explore
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{classInfo.title}</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{classInfo.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* Subjects Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Select Subject</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {SUBJECTS.map((subject, idx) => (
                            <Link
                                key={subject.id}
                                href={`/explore/${classId}/${subject.id}`}
                                className="group p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
                            >
                                <div className={`w-16 h-16 mx-auto rounded-2xl ${subject.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                                    {subject.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{subject.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">Explore Courses <ArrowRight className="inline h-3 w-3" /></p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Courses */}
            <section className="py-16 bg-gray-50/80">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Courses for {classInfo.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <CourseCard key={item} classTitle={classInfo.title} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function CourseCard({ classTitle }: { classTitle: string }) {
    const [isEnrollOpen, setIsEnrollOpen] = useState(false);

    return (
        <>
            <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-xs font-bold bg-indigo-600 px-2 py-1 rounded-md mb-2 inline-block">LIVE</span>
                        <h3 className="font-bold text-lg">Excellence Batch 2025</h3>
                    </div>
                </div>
                <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Users className="h-4 w-4" /> {classTitle}
                        </div>
                        <div className="text-sm text-yellow-500 flex items-center gap-1 font-bold">
                            <Star className="h-4 w-4 fill-current" /> 4.8
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                        <div>
                            <span className="text-lg font-bold text-gray-900">₹3,999</span>
                            <span className="text-sm text-gray-400 line-through ml-2">₹6,999</span>
                        </div>
                        <Button onClick={() => setIsEnrollOpen(true)} size="sm" className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
                            Enroll
                        </Button>
                    </div>
                </div>
            </div>

            <EnrollmentModal
                isOpen={isEnrollOpen}
                onClose={() => setIsEnrollOpen(false)}
                courseCode="EXCEL-2025"
                price={3999}
                courseTitle={`Excellence Batch - ${classTitle}`}
            />
        </>
    );
}
