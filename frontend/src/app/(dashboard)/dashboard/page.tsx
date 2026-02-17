"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  PlayCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  FileText,
  MessageCircle,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleCourseClick = (courseId: number) => {
    router.push(`/courses/${courseId}`);
  };

  const handleLiveClassClick = (classId: number) => {
    router.push(`/live?class=${classId}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back, John!</h1>
          <p className="text-gray-500 mt-2">Here's what's happening with your learning today.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleCourseClick(1)}>Resume Learning</Button>
        </div>
      </div>

      {/* Stats Cards - Now Clickable */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/courses">
          <Card className="shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-indigo-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Courses Enrolled
              </CardTitle>
              <BookOpen className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500 mt-1">
                +2 from last month
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/assignments">
          <Card className="shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Assignments
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-gray-500 mt-1">
                3 due this week
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/progress">
          <Card className="shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Hours Learned
              </CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124.5</div>
              <p className="text-xs text-gray-500 mt-1">
                +12.5h this week
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/progress">
          <Card className="shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Average Grade
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-gray-500 mt-1">
                Top 10% of students
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Courses / Continue Learning */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>
              Pick up where you left off
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: 1, title: "Advanced React Patterns", chapter: "Chapter 4: Compound Components", progress: 45, timeLeft: "45m" },
              { id: 2, title: "System Design Fundamentals", chapter: "Chapter 2: Scalability Patterns", progress: 65, timeLeft: "30m" }
            ].map((course) => (
              <button
                key={course.id}
                onClick={() => handleCourseClick(course.id)}
                className="w-full flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50/50 p-4 transition-all hover:bg-indigo-50/50 hover:border-indigo-200 cursor-pointer"
              >
                <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                  <PlayCircle className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1 space-y-1 text-left">
                  <p className="text-sm font-medium leading-none">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.chapter} • {course.timeLeft} left
                  </p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-gray-200">
                    <div className={`h-full rounded-full bg-indigo-600`} style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Live Classes */}
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Live Classes</CardTitle>
            <CardDescription>
              Don't miss your scheduled sessions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, title: "System Design Interview Prep", date: "17", month: "Feb", time: "4:00 PM - 5:30 PM" },
                { id: 2, title: "React Advanced Hooks", date: "18", month: "Feb", time: "2:00 PM - 3:30 PM" },
                { id: 3, title: "Database Optimization", date: "19", month: "Feb", time: "5:00 PM - 6:30 PM" }
              ].map((liveClass) => (
                <button
                  key={liveClass.id}
                  onClick={() => handleLiveClassClick(liveClass.id)}
                  className="w-full flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer text-left"
                >
                  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-2 text-center text-xs shadow-sm w-12 shrink-0">
                    <span className="font-semibold text-gray-900">{liveClass.date}</span>
                    <span className="text-gray-500 uppercase text-[10px]">{liveClass.month}</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none">{liveClass.title}</p>
                    <div className="flex items-center text-xs text-gray-500 gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{liveClass.time}</span>
                    </div>
                    <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0 h-5">
                      Live Zoom
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full text-xs" onClick={() => router.push('/live')}>
              View Schedule
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Join Live Class", icon: CalendarDays, href: "/live" },
            { label: "Submit Assignment", icon: FileText, href: "/assignments" },
            { label: "View Grades", icon: BarChart3, href: "/progress" },
            { label: "Ask Doubt", icon: MessageCircle, href: "/doubt" }
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <button className="w-full flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-all text-sm font-medium text-gray-700 hover:text-indigo-700 cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <action.icon className="h-5 w-5" />
                </div>
                {action.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
