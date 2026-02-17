import { Clock, Users, Star, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  duration: string;
  isLive?: boolean;
  level?: string;
  daysLeft?: number;
}

export default function CourseCard({ course, isEnrolled = false }: { course: Course; isEnrolled?: boolean }) {
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <Card className="group flex flex-col h-full overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl">
      {/* Thumbnail Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <img
          src={course.thumbnail || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80"}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {course.isLive && (
            <Badge className="bg-red-500 text-white border-0 shadow-sm animate-pulse">
              LIVE
            </Badge>
          )}
          {course.level && (
            <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm border-0 shadow-sm">
              {course.level}
            </Badge>
          )}
        </div>

        {/* Bottom Overlay Info */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
            <Users className="h-3 w-3" />
            <span>{course.students.toLocaleString()}+ Enrolled</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-yellow-400">
            <Star className="h-3 w-3 fill-current" />
            <span>{course.rating}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 md:text-xl">
          {course.title}
        </h3>

        <div className="mt-2 flex items-center gap-4 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{course.instructor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-green-600 font-bold">{discount}% OFF</p>
          </div>

          <Button size="sm" className="rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200">
            Explore
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
