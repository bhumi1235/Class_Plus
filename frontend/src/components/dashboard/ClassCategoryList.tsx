"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function ClassCategoryList() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Explore by Class</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[
                    { label: "Class 9", id: "class-9", gradient: "from-blue-500 to-cyan-400" },
                    { label: "Class 10", id: "class-10", gradient: "from-indigo-500 to-purple-500" },
                    { label: "Class 11", id: "class-11", gradient: "from-pink-500 to-rose-400" },
                    { label: "Class 12", id: "class-12", gradient: "from-amber-400 to-orange-500" },
                    { label: "Dropper / JEE", id: "dropper", gradient: "from-emerald-500 to-teal-400" },
                ].map((item) => (
                    <Link key={item.id} href={`/explore/${item.id}`} className="group relative block overflow-hidden rounded-3xl bg-white shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className={`aspect-square w-full bg-gradient-to-br ${item.gradient} opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                            <GraduationCap className="h-12 w-12 text-white/90 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">{item.label}</h3>
                            <p className="text-xs text-gray-400 mt-1">Explore Courses</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
