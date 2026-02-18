"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Star, Users, BookOpen } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnrollmentModal } from "@/components/courses/EnrollmentModal";
import { useState } from "react";

export default function SubjectPage() {
    const params = useParams();
    const router = useRouter();
    const classId = params.classId as string;
    const subjectId = params.subjectId as string;

    const formatId = (id: string) => id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ');
    const classTitle = formatId(classId);
    const subjectTitle = formatId(subjectId);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-[72px] z-30">
                <div className="container mx-auto px-4 h-16 flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            {subjectTitle}
                            <span className="text-gray-400 font-normal">/</span>
                            <span className="text-gray-600 font-medium text-base">{classTitle}</span>
                        </h1>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-12 bg-gray-50/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Mock Courses List */}
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <CourseCard key={i} subject={subjectTitle} classTitle={classTitle} index={i} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

function CourseCard({ subject, classTitle, index }: { subject: string, classTitle: string, index: number }) {
    const [isEnrollOpen, setIsEnrollOpen] = useState(false);
    const price = 2999 + (index * 500);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <img
                        src={`https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80`}
                        alt="Course"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl line-clamp-1">{subject} Mastery Course {index + 1}</h3>
                        <p className="text-gray-300 text-sm">{classTitle} • Full Syllabus</p>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">200+ Video Lessons</span>
                        <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold">Live Doubt</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div>
                            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
                        </div>
                        <Button
                            onClick={() => setIsEnrollOpen(true)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6"
                        >
                            Enroll Now
                        </Button>
                    </div>
                </div>
            </motion.div>

            <EnrollmentModal
                isOpen={isEnrollOpen}
                onClose={() => setIsEnrollOpen(false)}
                courseCode={`${subject.slice(0, 3).toUpperCase()}-${index + 101}`}
                price={price}
                courseTitle={`${subject} Mastery Course ${index + 1}`}
            />
        </>
    );
}
