"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES } from "@/data/mock";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import {
    Clock,
    Users,
    Star,
    PlayCircle,
    CheckCircle2,
    ShieldCheck,
    Share2,
    ArrowLeft,
    BookOpen,
    FileText,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const course = COURSES.find((c) => c.id === resolvedParams.id);
    const [activeTab, setActiveTab] = useState("Overview");

    // Mock enrolled course IDs and progress - in real app, this would come from user data
    const enrolledCourseIds = ["1", "2"];
    const isEnrolled = course ? enrolledCourseIds.includes(course.id) : false;
    const courseProgress = isEnrolled ? (course.id === "1" ? 45 : 65) : 0; // Mock progress

    if (!course) {
        notFound();
    }

    const discount = Math.round(
        ((course.originalPrice - course.price) / course.originalPrice) * 100
    );

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Breadcrumb / Back */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/courses" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Hero Section */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {isEnrolled && <Badge className="bg-green-600 hover:bg-green-700">Enrolled</Badge>}
                                {course.isLive && <Badge variant="destructive">Live Class</Badge>}
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">{course.level}</Badge>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                {course.title}
                            </h1>
                            <p className="text-lg text-gray-600">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-500">
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current" />
                                        <Star className="h-4 w-4 fill-current/50" />
                                    </div>
                                    <span className="font-medium text-gray-900">{course.rating}</span>
                                    <span>({course.reviews?.length || 120} reviews)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{course.students.toLocaleString()} students</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>Last updated Feb 2024</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                        {/* Placeholder for instructor avatar */}
                                        <div className="h-full w-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                            {course.instructor.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900">Created by <span className="text-indigo-600">{course.instructor}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Tabs */}
                        <div className="border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {["Overview", "Curriculum", "Reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            activeTab === tab
                                                ? "border-indigo-500 text-indigo-600"
                                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                            "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Panels */}
                        <div className="min-h-[300px]">
                            {activeTab === "Overview" && (
                                <div className="space-y-6 animate-in fade-in-50">
                                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">What you'll learn</h3>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {course.features?.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                    <span className="text-sm text-gray-600">{feature}</span>
                                                </div>
                                            ))}
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-600">Lifetime access to course materials</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-600">Certificate of completion</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="prose max-w-none text-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                        <p>{course.description}</p>
                                        <p>
                                            This comprehensive course is designed for beginners and intermediate learners who want to master the skills needed in the modern industry.
                                            We cover theoretical concepts and deep-dive into practical applications.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Curriculum" && (
                                <div className="space-y-4 animate-in fade-in-50">
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <span>{course.curriculum?.length || 0} Sections • {course.duration} Total Length</span>
                                        <button className="text-indigo-600 font-medium hover:underline">Expand All</button>
                                    </div>

                                    {course.curriculum ? (
                                        course.curriculum.map((section, idx) => (
                                            <div key={idx} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                                                <div className="flex items-center justify-between bg-gray-50/50 px-4 py-3 cursor-pointer hover:bg-gray-50">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                                                            {idx + 1}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{section.title}</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">{section.duration}</div>
                                                </div>
                                                <div className="divide-y divide-gray-100">
                                                    {section.lessons.map((lesson, lIdx) => (
                                                        <div key={lIdx} className="flex items-center gap-3 px-4 py-3 pl-12 hover:bg-gray-50/50 text-sm text-gray-600">
                                                            <PlayCircle className="h-4 w-4 text-gray-400" />
                                                            <span>{lesson}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                                            <FileText className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                                            No curriculum details available yet.
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "Reviews" && (
                                <div className="space-y-6 animate-in fade-in-50">
                                    {course.reviews && course.reviews.length > 0 ? (
                                        course.reviews.map((review, idx) => (
                                            <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                                            {review.user.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 text-sm">{review.user}</h4>
                                                            <div className="flex text-amber-500 text-xs mt-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} className={cn("h-3 w-3", i < Math.floor(review.rating) ? "fill-current" : "fill-gray-200 text-gray-200")} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-400">2 days ago</span>
                                                </div>
                                                <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-12 text-center bg-white rounded-xl border border-gray-200">
                                            <MessageSquare className="h-10 w-10 mx-auto text-gray-300 mb-3" />
                                            <h3 className="text-gray-900 font-medium">No reviews yet</h3>
                                            <p className="text-gray-500 text-sm mt-1">Be the first to leave a review for this course!</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Preview Card */}
                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                                <div className="relative aspect-video w-full bg-gray-100 group cursor-pointer">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                            <PlayCircle className="h-6 w-6 text-indigo-600 ml-0.5" />
                                        </div>
                                    </div>
                                    {/* We don't have real images yet so use a gradient */}
                                    <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20" />
                                </div>

                                <div className="p-6">
                                    {isEnrolled && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-semibold text-green-900">Your Progress</span>
                                                <span className="text-sm font-bold text-green-700">{courseProgress}%</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-green-200">
                                                <div
                                                    className="h-full rounded-full bg-green-600 transition-all duration-300"
                                                    style={{ width: `${courseProgress}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-green-700 mt-2">
                                                {courseProgress < 100 ? `Keep going! You're doing great.` : `Congratulations! Course completed.`}
                                            </p>
                                        </div>
                                    )}

                                    {!isEnrolled && (
                                        <>
                                            <div className="flex items-baseline gap-2 mb-4">
                                                <span className="text-3xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
                                                <span className="text-lg text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                                                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded ml-auto">{discount}% OFF</span>
                                            </div>
                                        </>
                                    )}

                                    <Button
                                        size="lg"
                                        className={`w-full mb-3 shadow-md transition-transform active:scale-95 ${isEnrolled ? 'bg-indigo-600 hover:bg-indigo-700' : 'shadow-indigo-200'
                                            }`}
                                    >
                                        {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                                    </Button>
                                    {!isEnrolled && (
                                        <Button variant="outline" className="w-full">
                                            Add to Wishlist
                                        </Button>
                                    )}

                                    <div className="mt-6 space-y-3 text-sm text-gray-600">
                                        <p className="font-semibold text-gray-900">This course includes:</p>
                                        <div className="flex items-center gap-3">
                                            <PlayCircle className="h-4 w-4 text-gray-400" />
                                            <span>{course.duration} on-demand video</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-4 w-4 text-gray-400" />
                                            <span>15 articles</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <BookOpen className="h-4 w-4 text-gray-400" />
                                            <span>Full lifetime access</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck className="h-4 w-4 text-gray-400" />
                                            <span>Certificate of completion</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50/50 p-4 border-t border-gray-100 text-center">
                                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors">
                                        <Share2 className="h-4 w-4" />
                                        Share this course
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
                                <p className="font-semibold text-gray-900">30-Day Money-Back Guarantee</p>
                                <p className="text-sm text-gray-500 mt-1">Not satisfied? Get a full refund, no questions asked.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
