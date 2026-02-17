import { Clock, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
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
  description?: string;
  curriculum?: { title: string; duration: string; lessons: string[] }[];
  reviews?: { user: string; rating: number; comment: string }[];
  features?: string[];
}

export default function CourseCard({ course, isEnrolled = false }: { course: Course; isEnrolled?: boolean }) {
  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-gray-200/60">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {/* Placeholder gradient for thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 transition-transform duration-500 group-hover:scale-105" />

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isEnrolled && (
            <Badge className="bg-green-600 hover:bg-green-700 shadow-sm">
              Enrolled
            </Badge>
          )}
          {course.isLive && (
            <Badge variant="destructive" className="shadow-sm">
              Live Class
            </Badge>
          )}
          {course.level && (
            <Badge variant="secondary" className="bg-white/90 text-gray-900 shadow-sm backdrop-blur-sm">
              {course.level}
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="p-5 pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
            <Star className="h-3 w-3 fill-current" />
            <span>{course.rating}</span>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <Users className="h-3 w-3" />
            {course.students.toLocaleString()}
          </div>
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
          {course.title}
        </CardTitle>
        <CardDescription className="text-xs mt-1 font-medium text-gray-500">
          by {course.instructor}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-grow">
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </div>
          {course.daysLeft && (
            <span className="text-indigo-600 font-medium">
              Starts in {course.daysLeft} days
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-auto bg-gray-50/50">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹{course.price.toLocaleString()}</span>
            <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50 px-1 py-0 h-5">
              {discount}% OFF
            </Badge>
          </div>
        </div>
        <Button size="sm" className="ml-4 shrink-0" asChild>
          <Link href={`/courses/${course.id}`}>
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
