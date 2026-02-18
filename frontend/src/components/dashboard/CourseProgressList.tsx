import { PlayCircle } from "lucide-react";

const PROGRESS_COURSES = [
    {
        id: 1,
        title: "Physics - Class 12",
        thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        progress: 75,
        lastLesson: "Electrostatics - Lecture 4"
    },
    {
        id: 2,
        title: "Chemistry - Organic",
        thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        progress: 45,
        lastLesson: "Alcohols & Phenols - L2"
    },
    {
        id: 3,
        title: "Mathematics - Calculus",
        thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        progress: 10,
        lastLesson: "Limits & Continuity - Intro"
    },
    {
        id: 4,
        title: "English Core",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        progress: 90,
        lastLesson: "Writing Skills - Notice"
    }
];

export function CourseProgressList() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
                <a href="/my-batches" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</a>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                {PROGRESS_COURSES.map((course) => (
                    <div
                        key={course.id}
                        className="snap-start shrink-0 w-72 bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="relative h-40 w-full rounded-lg overflow-hidden mb-3">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${course.thumbnail})` }}
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                <PlayCircle className="h-3 w-3" />
                                Resume
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h3>
                            <p className="text-xs text-gray-500 line-clamp-1">{course.lastLesson}</p>

                            <div className="space-y-1">
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
