"use client";

import { useState } from "react";
import { Video, Clock, Users, Calendar, Play, Bell, CheckCircle2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const LIVE_CLASSES = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    instructor: "Angela Yu",
    instructorAvatar: "AY",
    time: "10:00 AM - 11:30 AM",
    date: "Today",
    duration: "1h 30m",
    attendees: 245,
    status: "ongoing",
    thumbnail: "from-blue-500 to-indigo-600",
    course: "Complete Web Development"
  },
  {
    id: 2,
    title: "Advanced CSS Flexbox & Grid",
    instructor: "Kevin Powell",
    instructorAvatar: "KP",
    time: "02:00 PM - 03:30 PM",
    date: "Today",
    duration: "1h 30m",
    attendees: 180,
    status: "upcoming",
    thumbnail: "from-purple-500 to-pink-600",
    course: "Master UI/UX Design"
  },
  {
    id: 3,
    title: "System Design Interview Prep",
    instructor: "Kunal Kushwaha",
    instructorAvatar: "KK",
    time: "05:00 PM - 06:30 PM",
    date: "Tomorrow",
    duration: "1h 30m",
    attendees: 320,
    status: "upcoming",
    thumbnail: "from-green-500 to-teal-600",
    course: "Data Structures & Algorithms"
  },
  {
    id: 4,
    title: "JavaScript ES6+ Deep Dive",
    instructor: "Angela Yu",
    instructorAvatar: "AY",
    time: "10:00 AM - 11:00 AM",
    date: "Yesterday",
    duration: "1h",
    attendees: 198,
    status: "completed",
    thumbnail: "from-orange-500 to-red-600",
    course: "Complete Web Development"
  },
];

export default function LivePage() {
  const [activeTab, setActiveTab] = useState<"ongoing" | "upcoming" | "completed">("ongoing");

  const filteredClasses = LIVE_CLASSES.filter((cls) => cls.status === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Live Classes</h1>
          <p className="text-gray-500 mt-1">Join live sessions and interact with instructors in real-time</p>
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Calendar className="h-4 w-4 mr-2" />
          View Full Schedule
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {[
          { label: "Ongoing", value: "ongoing" as const, count: LIVE_CLASSES.filter(c => c.status === "ongoing").length },
          { label: "Upcoming", value: "upcoming" as const, count: LIVE_CLASSES.filter(c => c.status === "upcoming").length },
          { label: "Completed", value: "completed" as const, count: LIVE_CLASSES.filter(c => c.status === "completed").length }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${activeTab === tab.value
                ? "text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <Badge
                variant="secondary"
                className={`ml-2 ${activeTab === tab.value ? 'bg-indigo-100 text-indigo-700' : ''}`}
              >
                {tab.count}
              </Badge>
            )}
            {activeTab === tab.value && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
            )}
          </button>
        ))}
      </div>

      {/* Classes Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => (
            <Card key={cls.id} className="overflow-hidden hover:shadow-lg transition-all group">
              {/* Thumbnail */}
              <div className={`relative h-40 bg-gradient-to-br ${cls.thumbnail} flex items-center justify-center`}>
                <Video className="h-16 w-16 text-white/30" strokeWidth={1.5} />

                {/* Status Badge */}
                {cls.status === "ongoing" && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-600 hover:bg-red-700 animate-pulse">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-white" />
                        LIVE NOW
                      </span>
                    </Badge>
                  </div>
                )}

                {cls.status === "completed" && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gray-900/80 hover:bg-gray-900">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                )}

                {/* Attendees */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                  <Users className="h-3.5 w-3.5 text-white" />
                  <span className="text-xs font-medium text-white">{cls.attendees}</span>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {cls.course}
                  </Badge>
                  <span className="text-xs text-gray-500">{cls.date}</span>
                </div>
                <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  {cls.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-4 space-y-3">
                {/* Instructor */}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700">
                    {cls.instructorAvatar}
                  </div>
                  <span className="text-sm text-gray-600">{cls.instructor}</span>
                </div>

                {/* Time & Duration */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-gray-400">•</span>
                    <span>{cls.duration}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                {cls.status === "ongoing" && (
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Play className="h-4 w-4 mr-2" />
                    Join Class
                  </Button>
                )}
                {cls.status === "upcoming" && (
                  <div className="w-full flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Bell className="h-4 w-4 mr-2" />
                      Remind Me
                    </Button>
                    <Button variant="outline" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {cls.status === "completed" && (
                  <Button variant="outline" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Recording
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Video className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No {activeTab} classes
                </h3>
                <p className="text-sm text-gray-500 max-w-sm mb-6">
                  {activeTab === "ongoing"
                    ? "There are no live classes happening right now. Check upcoming classes or browse recordings."
                    : activeTab === "upcoming"
                      ? "You don't have any upcoming classes scheduled. Explore courses to enroll in new classes."
                      : "You haven't attended any classes yet. Join live sessions to see them here."}
                </p>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Browse All Classes
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
