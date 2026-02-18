"use client";

import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { Badge } from "@/components/ui/Badge";
import { BookOpen } from "lucide-react";

// Mock Data (duplicated for now to ensure standalone function, ideally shared)
const COURSES = [
  {
    id: "1",
    title: "Complete JEE Prep 2026",
    thumbnail: "https://images.unsplash.com/photo-1620912189863-010350284897?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
    instructor: "Expert Engineering Team",
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    students: 15400,
    duration: "12 Months",
    isLive: true,
    level: "Class 12",
    daysLeft: 5,
    category: "JEE"
  },
  {
    id: "2",
    title: "NEET Success Batch 2026",
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    instructor: "Top Medical Faculty",
    price: 3999,
    originalPrice: 5999,
    rating: 4.8,
    students: 22000,
    duration: "12 Months",
    isLive: true,
    level: "Class 11",
    daysLeft: 2,
    category: "NEET"
  }
];

export default function MyBatchesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Batches</h1>
          <p className="text-gray-500 mt-1">Manage and access your enrolled courses.</p>
        </div>
      </div>

      <div className="flex gap-2 pb-2 border-b border-gray-100">
        {[
          { label: "All Batches", value: "all" as const },
          { label: "Active", value: "active" as const },
          { label: "Completed", value: "completed" as const }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === tab.value
              ? "bg-indigo-50 text-indigo-700"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {COURSES.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isEnrolled={true}
          />
        ))}
      </div>

      {COURSES.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-sm">
            <BookOpen className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No batches purchased yet</h3>
          <p className="text-gray-500 mt-1 mb-6">Explore our courses to start learning.</p>
        </div>
      )}
    </div>
  );
}
