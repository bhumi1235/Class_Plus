"use client";

import { useEffect, useState } from "react";
import { BookOpenCheck, CheckCircle2, Clock, TrendingUp, Award, Calendar, Target, ChevronRight, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

type UserRole = "student" | "parent";

const COURSES = [
  { id: "1", name: "Web Development Bootcamp", progress: 80, hoursSpent: 45, lessonsCompleted: 32, totalLessons: 40 },
  { id: "2", name: "DSA in Java", progress: 55, hoursSpent: 28, lessonsCompleted: 22, totalLessons: 40 },
  { id: "3", name: "Physics Class 12", progress: 35, hoursSpent: 15, lessonsCompleted: 14, totalLessons: 40 },
];

const WEEKLY_ACTIVITY = [
  { day: "M", hours: 2, label: "Monday" },
  { day: "T", hours: 1.5, label: "Tuesday" },
  { day: "W", hours: 3, label: "Wednesday" },
  { day: "T", hours: 0.5, label: "Thursday" },
  { day: "F", hours: 2.5, label: "Friday" },
  { day: "S", hours: 1, label: "Saturday" },
  { day: "S", hours: 1.5, label: "Sunday" },
];

export default function ProgressPage() {
  const [role, setRole] = useState<UserRole>("student");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedRole = window.localStorage.getItem("userRole") as UserRole | null;
    if (storedRole === "student" || storedRole === "parent") setRole(storedRole);
  }, []);

  const isParent = role === "parent";
  const title = isParent ? "Child's Progress" : "Your Progress";

  const totalHours = WEEKLY_ACTIVITY.reduce((sum, day) => sum + day.hours, 0);
  const avgProgress = Math.round(COURSES.reduce((sum, c) => sum + c.progress, 0) / COURSES.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">Track your learning journey and achievements</p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          View Full Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Course Completion</p>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{avgProgress}%</p>
                <p className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Up 8% this week
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Daily Streak</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">5 days</p>
                <p className="text-sm text-gray-500 mt-1">Keep it going!</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Hours This Week</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalHours.toFixed(1)}h</p>
                <p className="text-sm text-green-600 mt-1">+1h vs last week</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Badges Earned</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">12</p>
                <p className="text-sm text-gray-500 mt-1">2 more to unlock</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly Activity Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Weekly Activity</CardTitle>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                +1h vs last week
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-48">
              {WEEKLY_ACTIVITY.map((day, idx) => {
                const maxHours = Math.max(...WEEKLY_ACTIVITY.map(d => d.hours));
                const heightPercent = (day.hours / maxHours) * 100;
                const isHovered = hoveredBar === idx;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full">
                      {isHovered && day.hours > 0 && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {day.hours}h
                        </div>
                      )}
                      <div
                        className="w-full rounded-t-lg bg-indigo-100 transition-all cursor-pointer"
                        style={{ height: `${Math.max(heightPercent, 8)}%` }}
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div
                          className={`w-full h-full rounded-t-lg transition-all ${isHovered ? 'bg-indigo-600' : 'bg-indigo-500'
                            }`}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-500">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Milestone Card */}
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-xs uppercase tracking-wide font-semibold">Next Milestone</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Complete 2 more assignments</h3>
            <p className="text-sm opacity-90 mb-6">
              {isParent
                ? "Encourage your child to finish pending work today."
                : "Finish today's tasks and keep your streak alive."}
            </p>
            <div className="flex items-center justify-between p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-lg font-bold">3/5</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-white/30">
              <div className="h-full w-3/5 rounded-full bg-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-lg">{isParent ? "Child's Courses" : "Your Courses"}</CardTitle>
            </div>
            <Link href="/courses">
              <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {COURSES.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`}>
                <div className="group p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {course.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {course.hoursSpent}h spent
                        </span>
                        <span>•</span>
                        <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${course.progress >= 80 ? 'bg-green-100 text-green-700' :
                          course.progress >= 50 ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                        }`}
                    >
                      {course.progress}%
                    </Badge>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full transition-all ${course.progress >= 80 ? 'bg-green-500' :
                          course.progress >= 50 ? 'bg-blue-500' :
                            'bg-orange-500'
                        }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
