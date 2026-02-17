"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/data/mock";
import { Badge } from "@/components/ui/Badge";

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "my">("all");

  // Mock enrolled course IDs - in real app, this would come from user data
  const enrolledCourseIds = ["1", "2"];

  const displayedCourses = activeTab === "my"
    ? COURSES.filter(course => enrolledCourseIds.includes(course.id))
    : COURSES;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Explore Courses</h1>
          <p className="text-gray-500 mt-1">Upgrade your skills with our top-rated courses.</p>
        </div>

      </div>

      <div className="flex gap-2 pb-2">
        {[
          { label: "All Courses", value: "all" as const },
          { label: "My Courses", value: "my" as const }
        ].map((tab) => (
          <Badge
            key={tab.value}
            variant={activeTab === tab.value ? "default" : "secondary"}
            className="px-4 py-1.5 text-sm cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={enrolledCourseIds.includes(course.id)}
          />
        ))}
      </div>

      {displayedCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses found in this category.</p>
        </div>
      )}
    </div>
  );
}

