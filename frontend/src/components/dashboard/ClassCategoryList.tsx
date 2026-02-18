"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, CheckCheck, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const CLASSES = [
    { id: "11", label: "Class 11", sub: "Science / Commerce" },
    { id: "12", label: "Class 12", sub: "Board Exams" },
    { id: "jee", label: "JEE", sub: "Mains & Advanced" },
    { id: "neet", label: "NEET", sub: "Medical Entrance" },
    { id: "found", label: "Foundation", sub: "Class 6-10" },
    { id: "gov", label: "Govt Exams", sub: "SSC / Banking" },
];

const MOCK_COURSES: Record<string, string[]> = {
    "11": ["Physics 11 (Part 1)", "Chemistry 11 (Organic)", "Maths 11 (Calculus)", "English Core 11"],
    "12": ["Physics 12 (Optics)", "Chemistry 12 (Inorganic)", "Biology 12", "Computer Science"],
    "jee": ["Engineering Excellence", "Advanced Math Series", "Physics Mastery"],
    "neet": ["Medical Entrance Prep", "Biology Foundation", "Chemistry Crash Course"],
    "found": ["Olympiad Math", "NTSE Prep", "Science Foundation"],
    "gov": ["SSC CGL 2025", "Banking PO Absolute", "UPSC Prelims"]
};

export function ClassCategoryList() {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Explore by Class</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {CLASSES.map((cls) => (
                    <button
                        key={cls.id}
                        onClick={() => setSelectedClass(selectedClass === cls.id ? null : cls.id)}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md",
                            selectedClass === cls.id
                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                                : "bg-white border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50"
                        )}
                    >
                        <span className="text-lg font-bold">{cls.label}</span>
                        <span className={cn(
                            "text-xs mt-1",
                            selectedClass === cls.id ? "text-indigo-100" : "text-gray-500"
                        )}>
                            {cls.sub}
                        </span>
                        {selectedClass === cls.id && (
                            <div className="absolute top-1 right-1">
                                <CheckCheck className="h-4 w-4 text-white opacity-50" />
                            </div>
                        )}
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {selectedClass && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white border border-gray-200 rounded-xl p-6 mt-2 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-indigo-600" />
                                    Recommended for {CLASSES.find(c => c.id === selectedClass)?.label}
                                </h3>
                                <button
                                    onClick={() => setSelectedClass(null)}
                                    className="text-xs text-red-500 hover:text-red-600 font-medium"
                                >
                                    Close
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {MOCK_COURSES[selectedClass]?.map((course, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-white transition-colors cursor-pointer group">
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700">{course}</span>
                                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
