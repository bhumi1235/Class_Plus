"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useParams } from "next/navigation";
import CourseCard from "@/components/CourseCard";

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

const POPULAR_COURSES = [
    {
        id: "explore-1",
        title: "Excellence Batch 2025",
        thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        instructor: "Top Faculty",
        price: 3999,
        originalPrice: 6999,
        rating: 4.8,
        students: 15200,
        duration: "200h",
        isLive: true,
        level: "All Levels",
    },
    {
        id: "explore-2",
        title: "Foundation Batch 2025",
        thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        instructor: "Expert Mentors",
        price: 2499,
        originalPrice: 4999,
        rating: 4.7,
        students: 9800,
        duration: "150h",
        level: "Beginner",
    },
    {
        id: "explore-3",
        title: "Crash Course 2025",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        instructor: "IIT Alumni",
        price: 1499,
        originalPrice: 2999,
        rating: 4.6,
        students: 7200,
        duration: "60h",
        isLive: true,
        level: "Advanced",
    },
];

export default function ClassPage() {
    const params = useParams();
    const classId = params.classId as string;
    const classInfo = CLASS_DATA[classId] || { title: "Class Details", description: "Explore courses for your class." };

    return (
        <div className="min-h-screen flex flex-col bg-white font-sans">
            <Navbar />

            {/* Hero */}
            <section className="relative py-20 bg-indigo-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">Explore</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{classInfo.title}</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{classInfo.description}</p>
                    </motion.div>
                </div>
            </section>

            {/* Subjects */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Select Subject</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {SUBJECTS.map((subject) => (
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

            {/* Popular Courses — unified CourseCard */}
            <section className="py-16 bg-gray-50/80">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Courses for {classInfo.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {POPULAR_COURSES.map((course) => (
                            <CourseCard key={course.id} course={course} isEnrolled={false} />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
