"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    PlayCircle, FileText, Clock, Star, Users,
    ChevronRight, Lock, CheckCircle, MessageCircle, AlertCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { EnrollmentModal } from "@/components/courses/EnrollmentModal";
import { getCourseById, isEnrolledIn, useCoursePageData } from "@/lib/courseData";

export default function CourseDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = typeof params?.courseId === "string" ? params.courseId : "";

    const [activeTab, setActiveTab] = useState("Curriculum");
    const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

    const { loading } = useCoursePageData();
    const course = getCourseById(courseId);
    const isEnrolled = isEnrolledIn(courseId);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-indigo-500 mx-auto mb-4" />
                    <p className="text-gray-500">Loading course…</p>
                </div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <AlertCircle className="h-16 w-16 text-gray-300 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-700">Course Not Found</h2>
                    <p className="text-gray-500">This course doesn't exist or has been removed.</p>
                    <Button onClick={() => router.push("/courses")} className="mt-4">
                        Browse Courses
                    </Button>
                </div>
            </div>
        );
    }

    const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

    return (
        <div className="min-h-screen bg-gray-50 pb-28">
            {/* Header Section */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="shrink-0" onClick={() => router.back()}>
                        <ChevronRight className="h-6 w-6 rotate-180" />
                    </Button>
                    <h1 className="text-lg font-bold truncate flex-1">{course.title}</h1>
                    {isEnrolled ? (
                        <span className="shrink-0 text-xs font-bold bg-green-100 text-green-700 border border-green-200 px-3 py-1.5 rounded-full">
                            ✓ Enrolled
                        </span>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEnrollmentOpen(true)}
                            className="shrink-0 text-xs font-bold border-indigo-300 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full"
                        >
                            Enroll
                        </Button>
                    )}
                </div>
            </header>

            <div className="container mx-auto px-4 py-6 space-y-6 max-w-3xl">

                {/* Thumbnail */}
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-lg">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                        <div>
                            <h2 className="text-xl font-bold">{course.title}</h2>
                            <p className="text-sm text-white/80 mt-1">{course.instructor}</p>
                        </div>
                        {course.isLive && (
                            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                LIVE
                            </span>
                        )}
                    </div>
                </div>

                {/* Stats Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
                    <div className="text-center px-2">
                        <div className="flex justify-center mb-2 text-blue-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div className="font-bold text-xl text-gray-900">{course.duration}</div>
                        <div className="text-xs text-gray-500 font-medium">Duration</div>
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
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {course.description}
                    </p>
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
                        {course.curriculum.map((item) => (
                            <div
                                key={item.id}
                                className={cn(
                                    "group flex items-center gap-4 p-4 rounded-2xl border transition-all hover:shadow-md bg-white",
                                    !isEnrolled && item.isLocked ? "opacity-60" : "border-gray-100"
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

            {/* Sticky Bottom CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="container mx-auto max-w-3xl flex items-center gap-4">
                    {isEnrolled ? (
                        <>
                            <Button
                                onClick={() => router.push("/doubt")}
                                className="flex-1 h-14 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white shadow-xl flex items-center justify-center gap-2 text-lg font-bold"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Ask a Doubt
                            </Button>
                        </>
                    ) : (
                        <>
                            <div className="flex-1">
                                <p className="text-xs text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-extrabold text-gray-900">₹{course.price.toLocaleString()}</span>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{discount}% OFF</span>
                                </div>
                            </div>
                            <Button
                                onClick={() => setIsEnrollmentOpen(true)}
                                className="flex-[2] h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 text-lg font-bold"
                            >
                                Enroll
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Enrollment Modal — only mounted on details page */}
            <EnrollmentModal
                isOpen={isEnrollmentOpen}
                onClose={() => setIsEnrollmentOpen(false)}
                courseCode={course.id}
                price={course.price}
                courseTitle={course.title}
            />
        </div>
    );
}
