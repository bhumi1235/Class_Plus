"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
    PlayCircle, FileText, Clock, Star, Users,
    ChevronRight, Lock, CheckCircle, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Mock Data
const COURSE_DATA = {
    title: "Complete Science Batch (Class 12)",
    description: "Master Physics, Chemistry, and Biology with expert faculty. Comprehensive coverage of Class 12 syllabus.",
    rating: 4.8,
    students: 12500,
    days: 45, // Days remaining or duration
    enrolled: false, // Simulator for enrollment status
    tabs: ["Curriculum", "Materials", "Announcements"],
    curriculum: [
        {
            id: 1,
            title: "Introduction to Optic Physics",
            duration: "45 mins",
            type: "video",
            isCompleted: true,
            isLocked: false,
        },
        {
            id: 2,
            title: "Ray Optics and Optical Instruments",
            duration: "60 mins",
            type: "video",
            isCompleted: false,
            isLocked: false,
        },
        {
            id: 3,
            title: "Practice Worksheet - 1",
            duration: "30 mins",
            type: "worksheet",
            isCompleted: false,
            isLocked: true,
        },
        {
            id: 4,
            title: "Wave Optics",
            duration: "55 mins",
            type: "video",
            isCompleted: false,
            isLocked: true,
        }
    ]
};

export default function CourseDetailsPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState("Curriculum");
    const [isEnrolled, setIsEnrolled] = useState(false); // Toggle for demo

    // Simulate data fetching based on params.courseId
    const course = COURSE_DATA;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header Section */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="shrink-0" onClick={() => window.history.back()}>
                        <ChevronRight className="h-6 w-6 rotate-180" />
                    </Button>
                    <h1 className="text-lg font-bold truncate flex-1">{course.title}</h1>

                    {/* Demo Toggle */}
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEnrolled(!isEnrolled)}
                        className={cn("text-xs h-8", isEnrolled ? "bg-green-50 text-green-700 border-green-200" : "")}
                    >
                        {isEnrolled ? "Student View" : "Guest View"}
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 space-y-6 max-w-3xl">

                {/* Stats Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
                    <div className="text-center px-2">
                        <div className="flex justify-center mb-2 text-blue-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div className="font-bold text-xl text-gray-900">{course.days}</div>
                        <div className="text-xs text-gray-500 font-medium">Days Left</div>
                    </div>
                    <div className="text-center px-2">
                        <div className="flex justify-center mb-2 text-indigo-600">
                            <Users className="h-6 w-6" />
                        </div>
                        <div className="font-bold text-xl text-gray-900">{(course.students / 1000).toFixed(1)}k</div>
                        <div className="text-xs text-gray-500 font-medium">Students</div>
                    </div>
                    <div className="text-center px-2">
                        <div className="flex justify-center mb-2 text-amber-500">
                            <Star className="h-6 w-6 fill-current" />
                        </div>
                        <div className="font-bold text-xl text-gray-900">{course.rating}</div>
                        <div className="text-xs text-gray-500 font-medium">Rating</div>
                    </div>
                </div>

                {/* About Course */}
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-gray-900">About This Course</h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {course.description}
                    </p>
                    <button className="text-indigo-600 text-sm font-semibold">Read more</button>
                </div>

                {/* Tabs */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">What You'll Get</h2>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {course.tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                                    activeTab === tab
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                                        : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content List */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center justify-between">
                        Course Curriculum
                        <span className="text-xs font-normal text-gray-500">{course.curriculum.length} Lessons</span>
                    </h3>

                    <div className="space-y-3">
                        {course.curriculum.map((item, idx) => (
                            <div
                                key={item.id}
                                className={cn(
                                    "group flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md bg-white",
                                    !isEnrolled && item.isLocked ? "opacity-75" : "border-gray-100"
                                )}
                            >
                                {/* Icon */}
                                <div className={cn(
                                    "h-12 w-12 rounded-full flex items-center justify-center shrink-0",
                                    item.type === 'video' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                                )}>
                                    {item.type === 'video' ? <PlayCircle className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.title}</h4>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {item.duration}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Status */}
                                <div className="shrink-0">
                                    {isEnrolled ? (
                                        item.isCompleted ? (
                                            <CheckCircle className="h-6 w-6 text-green-500 fill-green-50" />
                                        ) : (
                                            <PlayCircle className="h-6 w-6 text-indigo-200 group-hover:text-indigo-600 transition-colors" />
                                        )
                                    ) : (
                                        item.isLocked ? (
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <PlayCircle className="h-6 w-6 text-indigo-600" />
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Floating Action / Enroll Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto max-w-3xl flex items-center gap-4">
                    {isEnrolled ? (
                        <Button className="flex-1 h-14 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white shadow-xl flex items-center justify-center gap-2 text-lg font-bold">
                            <MessageCircle className="h-5 w-5" />
                            Ask Doubt
                        </Button>
                    ) : (
                        <>
                            <div className="flex-1">
                                <p className="text-xs text-gray-500 line-through">₹4,999</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-gray-900">₹3,499</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">30% OFF</span>
                                </div>
                            </div>
                            <Button className="flex-[2] h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 text-lg font-bold">
                                Enroll Now
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
