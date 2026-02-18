"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardCarousel } from "@/components/dashboard/DashboardCarousel";
import { CourseProgressList } from "@/components/dashboard/CourseProgressList";
import { ClassCategoryList } from "@/components/dashboard/ClassCategoryList";
import { Button } from "@/components/ui/Button";
import { PlayCircle, FileText, HelpCircle, BarChart2, Calendar } from "lucide-react";

export default function Home() {
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();

  // Temporary auto-login for development, remove for production if real auth is connected
  useEffect(() => {
    if (!isAuthenticated) {
      // Uncomment to force login in demo if needed, or rely on them logging in via modal
      login({ name: "John Doe", email: "john@example.com" });
    }
  }, [isAuthenticated, login]);

  const QUICK_ACTIONS = [
    { label: "Live Classes", icon: PlayCircle, color: "text-red-500 bg-red-50", href: "/live" },
    { label: "Assignments", icon: FileText, color: "text-blue-500 bg-blue-50", href: "/assignments" },
    { label: "Doubt Solving", icon: HelpCircle, color: "text-orange-500 bg-orange-50", href: "/doubt" },
    { label: "Progress", icon: BarChart2, color: "text-green-500 bg-green-50", href: "/progress" },
    { label: "Schedule", icon: Calendar, color: "text-purple-500 bg-purple-50", href: "/live" },
  ];

  return (
    <div className="space-y-12 pb-16">

      {/* 1. Carousel */}
      <section>
        <DashboardCarousel />
      </section>

      {/* 2. Course Progress */}
      <section>
        <CourseProgressList />
      </section>

      {/* 3. Choose Your Class */}
      <section>
        <ClassCategoryList />
      </section>

      {/* 4. Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group space-y-3">
                <div className={`h-14 w-14 rounded-full flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-7 w-7" />
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-indigo-700">{action.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

