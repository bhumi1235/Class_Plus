"use client";

import { useState } from "react";
import { MessageCircle, Plus, Search, CheckCircle2, Clock, MessageSquare, ThumbsUp, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type DoubtStatus = "all" | "pending" | "resolved";

interface Doubt {
    id: number;
    title: string;
    description: string;
    course: string;
    courseBadge: string;
    status: "pending" | "resolved";
    askedBy: string;
    askedByAvatar: string;
    timeAgo: string;
    responses: number;
    likes: number;
    resolvedBy?: string;
    resolution?: string; // Appended resolution field
}

const DOUBTS: Doubt[] = [
    {
        id: 1,
        title: "How does useEffect cleanup function work?",
        description: "I'm confused about when the cleanup function in useEffect runs. Does it run before every re-render or only on unmount?",
        course: "Complete Web Development Bootcamp",
        courseBadge: "Web Dev",
        status: "resolved",
        askedBy: "You",
        askedByAvatar: "Y",
        timeAgo: "2 hours ago",
        responses: 3,
        likes: 5,
        resolvedBy: "Angela Yu",
        resolution: "The cleanup function runs before the component unmounts AND before the effect re-runs due to dependency changes. This ensures you don't have stale listeners or subscriptions."
    },
    {
        id: 2,
        title: "Binary Search Tree insertion complexity",
        description: "Why is the worst-case time complexity O(n) for BST insertion? Shouldn't it always be O(log n)?",
        course: "Data Structures & Algorithms in Java",
        courseBadge: "DSA",
        status: "pending",
        askedBy: "You",
        askedByAvatar: "Y",
        timeAgo: "5 hours ago",
        responses: 1,
        likes: 2
    },
    {
        id: 3,
        title: "Newton's Third Law application",
        description: "In the rocket propulsion example, how exactly does Newton's third law apply?",
        course: "Physics Class 12",
        courseBadge: "Physics",
        status: "resolved",
        askedBy: "You",
        askedByAvatar: "Y",
        timeAgo: "1 day ago",
        responses: 2,
        likes: 8,
        resolvedBy: "Dr. Sharma",
        resolution: "The rocket exerts a backward force on the exhaust gases (action), and the gases exert an equal and opposite forward force on the rocket (reaction), propelling it forward."
    },
];

export default function DoubtPage() {
    const [activeTab, setActiveTab] = useState<DoubtStatus>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDoubts = DOUBTS.filter(doubt => {
        const matchesTab = activeTab === "all" || doubt.status === activeTab;
        const matchesSearch = doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doubt.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const stats = {
        all: DOUBTS.length,
        pending: DOUBTS.filter(d => d.status === "pending").length,
        resolved: DOUBTS.filter(d => d.status === "resolved").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Doubts & Questions</h1>
                    <p className="text-gray-500 mt-1">Ask questions and get help from instructors</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask a Doubt
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card
                    className={`cursor-pointer transition-all ${activeTab === "all" ? "ring-2 ring-indigo-500 shadow-md" : "hover:shadow-md"}`}
                    onClick={() => setActiveTab("all")}
                >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">All Doubts</p>
                                <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.all}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                <MessageCircle className="h-6 w-6 text-indigo-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card
                    className={`cursor-pointer transition-all ${activeTab === "pending" ? "ring-2 ring-orange-500 shadow-md" : "hover:shadow-md"}`}
                    onClick={() => setActiveTab("pending")}
                >
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

                <Card
                    className={`cursor-pointer transition-all ${activeTab === "resolved" ? "ring-2 ring-green-500 shadow-md" : "hover:shadow-md"}`}
                    onClick={() => setActiveTab("resolved")}
                >
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Resolved</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.resolved}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search your doubts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>

            {/* Doubts List */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                    {activeTab === "all" ? "All" : activeTab} Doubts
                </h2>

                {filteredDoubts.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                                <MessageCircle className="h-10 w-10 text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                No doubts {activeTab !== "all" && activeTab}
                            </h3>
                            <p className="text-sm text-gray-500 max-w-sm mb-6">
                                {activeTab === "pending"
                                    ? "You don't have any pending doubts. Great job!"
                                    : activeTab === "resolved"
                                        ? "No resolved doubts yet. Ask a question to get started!"
                                        : "You haven't asked any doubts yet. Have a question? Ask away!"}
                            </p>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Ask Your First Doubt
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredDoubts.map((doubt) => (
                            <Card key={doubt.id} className="hover:shadow-lg transition-all group cursor-pointer">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    {doubt.courseBadge}
                                                </Badge>
                                                {doubt.status === "resolved" ? (
                                                    <Badge className="bg-green-600 hover:bg-green-700">
                                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                                        Resolved
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        Pending
                                                    </Badge>
                                                )}
                                            </div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors text-lg">
                                                {doubt.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-2 mb-3">
                                                {doubt.description}
                                            </p>

                                            {/* Resolution Display */}
                                            {doubt.status === "resolved" && doubt.resolution && (
                                                <div className="relative mt-3 pl-4 border-l-2 border-green-500">
                                                    <p className="text-sm text-gray-700 bg-green-50/50 p-3 rounded-r-lg">
                                                        <span className="font-semibold text-green-700 block mb-1">
                                                            Resolution by {doubt.resolvedBy}:
                                                        </span>
                                                        {doubt.resolution}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pb-3 pt-0">
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 border-t pt-3 border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
                                                {doubt.askedByAvatar}
                                            </div>
                                            <span>{doubt.askedBy}</span>
                                        </div>
                                        <span>•</span>
                                        <span>{doubt.timeAgo}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="h-4 w-4" />
                                            {doubt.responses} {doubt.responses === 1 ? 'response' : 'responses'}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <ThumbsUp className="h-4 w-4" />
                                            {doubt.likes}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
