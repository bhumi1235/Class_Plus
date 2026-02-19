"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock, FileText, AlertCircle, Upload, Eye, ChevronRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type AssignmentStatus = "pending" | "completed" | "overdue";

interface Assignment {
    id: number;
    title: string;
    course: string;
    courseBadge: string;
    dueDate: string;
    dueDateFull: string;
    status: AssignmentStatus;
    progress: number;
    totalQuestions?: number;
    completedQuestions?: number;
    grade?: string;
    submittedDate?: string;
}

const ASSIGNMENTS: Assignment[] = [
    {
        id: 1,
        title: "Arrays & Strings Practice Set",
        course: "Data Structures & Algorithms in Java",
        courseBadge: "DSA",
        dueDate: "Today",
        dueDateFull: "Today, 9:00 PM",
        status: "pending",
        progress: 40,
        totalQuestions: 10,
        completedQuestions: 4
    },
    {
        id: 2,
        title: "Responsive Landing Page UI",
        course: "Complete Web Development Bootcamp",
        courseBadge: "Web Dev",
        dueDate: "Tomorrow",
        dueDateFull: "Tomorrow, 6:00 PM",
        status: "pending",
        progress: 10,
        totalQuestions: 5,
        completedQuestions: 1
    },
    {
        id: 3,
        title: "Weekly Quiz - React Basics",
        course: "Complete Web Development Bootcamp",
        courseBadge: "Web Dev",
        dueDate: "Yesterday",
        dueDateFull: "Feb 16, 2024",
        status: "completed",
        progress: 100,
        totalQuestions: 15,
        completedQuestions: 15,
        grade: "95%",
        submittedDate: "Feb 16, 2024 at 4:30 PM"
    },
    {
        id: 4,
        title: "System Design Case Study",
        course: "Data Structures & Algorithms in Java",
        courseBadge: "DSA",
        dueDate: "2 days ago",
        dueDateFull: "Feb 15, 2024",
        status: "overdue",
        progress: 0,
        totalQuestions: 8,
        completedQuestions: 0
    },
];

export default function AssignmentsPage() {
    const [activeTab, setActiveTab] = useState<AssignmentStatus>("pending");

    const filteredAssignments = ASSIGNMENTS.filter((a) => a.status === activeTab);

    const stats = {
        pending: ASSIGNMENTS.filter(a => a.status === "pending").length,
        completed: ASSIGNMENTS.filter(a => a.status === "completed").length,
        overdue: ASSIGNMENTS.filter(a => a.status === "overdue").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Assignments</h1>
                    <p className="text-gray-500 mt-1">Track and submit your course assignments</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className={`cursor-pointer transition-all ${activeTab === "pending" ? "ring-2 ring-orange-500 shadow-md" : "hover:shadow-md"}`} onClick={() => setActiveTab("pending")}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Pending</p>
                                <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pending}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all ${activeTab === "completed" ? "ring-2 ring-green-500 shadow-md" : "hover:shadow-md"}`} onClick={() => setActiveTab("completed")}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Completed</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.completed}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all ${activeTab === "overdue" ? "ring-2 ring-red-500 shadow-md" : "hover:shadow-md"}`} onClick={() => setActiveTab("overdue")}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Overdue</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">{stats.overdue}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Assignments List */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{activeTab} Assignments</h2>

                {filteredAssignments.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <FileText className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No {activeTab} assignments
                            </h3>
                            <p className="text-sm text-gray-500 max-w-sm">
                                {activeTab === "pending"
                                    ? "Great! You don't have any pending assignments right now."
                                    : activeTab === "completed"
                                        ? "You haven't completed any assignments yet. Start working on your pending assignments!"
                                        : "You don't have any overdue assignments. Keep up the good work!"}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAssignments.map((assignment) => (
                            <Card key={assignment.id} className="hover:shadow-lg transition-all group">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <Badge variant="secondary" className="text-xs">
                                            {assignment.courseBadge}
                                        </Badge>
                                        {assignment.status === "pending" && (
                                            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                                                <Clock className="h-3 w-3 mr-1" />
                                                {assignment.dueDate}
                                            </Badge>
                                        )}
                                        {assignment.status === "completed" && (
                                            <Badge className="bg-green-600 hover:bg-green-700">
                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                Completed
                                            </Badge>
                                        )}
                                        {assignment.status === "overdue" && (
                                            <Badge className="bg-red-600 hover:bg-red-700 animate-pulse">
                                                <AlertCircle className="h-3 w-3 mr-1" />
                                                Overdue
                                            </Badge>
                                        )}
                                    </div>

                                    <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                                        {assignment.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">{assignment.course}</p>
                                </CardHeader>

                                <CardContent className="pb-4 space-y-3">
                                    {/* Due Date */}
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <CalendarDays className="h-4 w-4 text-gray-400" />
                                        <span>
                                            {assignment.status === "completed"
                                                ? `Submitted: ${assignment.submittedDate}`
                                                : `Due: ${assignment.dueDateFull}`}
                                        </span>
                                    </div>

                                    {/* Progress */}
                                    {assignment.status !== "completed" && (
                                        <div>
                                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                                                <span>Progress</span>
                                                <span className="font-medium">
                                                    {assignment.completedQuestions}/{assignment.totalQuestions} questions
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className={`h-full rounded-full transition-all ${assignment.status === "overdue" ? "bg-red-500" : "bg-indigo-600"
                                                        }`}
                                                    style={{ width: `${assignment.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Grade for completed */}
                                    {assignment.status === "completed" && assignment.grade && (
                                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                            <span className="text-sm font-medium text-green-900">Grade</span>
                                            <span className="text-2xl font-bold text-green-700">{assignment.grade}</span>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="pt-0">
                                    {assignment.status === "pending" && (
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Continue Assignment
                                        </Button>
                                    )}
                                    {assignment.status === "overdue" && (
                                        <Button className="w-full bg-red-600 hover:bg-red-700">
                                            <AlertCircle className="h-4 w-4 mr-2" />
                                            Submit Now
                                        </Button>
                                    )}
                                    {assignment.status === "completed" && (
                                        <Button variant="outline" className="w-full">
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Submission
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
