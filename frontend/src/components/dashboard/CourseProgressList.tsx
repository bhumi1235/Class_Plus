"use client";

import CourseCard, { Course } from "@/components/CourseCard";

const PROGRESS_COURSES: (Course & { progress: number; lastLesson: string })[] = [
    {
        id: "1",
        title: "Physics - Class 12",
        thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        instructor: "Dr. H.C. Verma",
        price: 2999,
        originalPrice: 5999,
        rating: 4.9,
        students: 18500,
        duration: "120h",
        level: "Class 12",
        progress: 75,
        lastLesson: "Electrostatics - Lecture 4",
    },
    {
        id: "2",
        title: "Chemistry - Organic",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        instructor: "N. Avasthi",
        price: 2499,
        originalPrice: 4999,
        rating: 4.7,
        students: 14200,
        duration: "90h",
        level: "Class 12",
        progress: 45,
        lastLesson: "Alcohols & Phenols - L2",
    },
    {
        id: "3",
        title: "Mathematics - Calculus",
        thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        instructor: "S.L. Loney",
        price: 2799,
        originalPrice: 5499,
        rating: 4.8,
        students: 21000,
        duration: "110h",
        level: "Class 12",
        progress: 10,
        lastLesson: "Limits & Continuity - Intro",
    },
    {
        id: "4",
        title: "English Core",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        instructor: "Prof. R. Gupta",
        price: 1499,
        originalPrice: 2999,
        rating: 4.6,
        students: 9800,
        duration: "60h",
        level: "Class 12",
        progress: 90,
        lastLesson: "Writing Skills - Notice",
    },
];

export function CourseProgressList() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                <a href="/courses" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PROGRESS_COURSES.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        isEnrolled={true}
                        progress={course.progress}
                        lastLesson={course.lastLesson}
                    />
                ))}
            </div>
        </div>
    );
}
