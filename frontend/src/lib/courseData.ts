// Shared course definitions used across CoursesPage and CourseDetailsPage

import { useState, useEffect, useCallback } from "react";
import { COURSE_API_BASE, COURSE_PATHS } from "@/lib/api";

export interface CourseItem {
    id: string;
    title: string;
    description: string;
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
    category: string;
    courseType?: string;
    board?: string;
    classname?: string;
    subject?: string;
    medium?: string;
    totalLessons?: number;
    difficulty?: string;
    tabs: string[];
    curriculum: {
        id: number;
        title: string;
        duration: string;
        type: "video" | "worksheet";
        isCompleted: boolean;
        isLocked: boolean;
    }[];
}

export const COURSES: CourseItem[] = [
    {
        id: "1",
        title: "Complete JEE Prep 2026",
        description: "Master Physics, Chemistry, and Mathematics with India's top IIT faculty. Comprehensive coverage of all Class 11 & 12 topics with 500+ hours of recorded lectures, live doubt sessions, and full-length mock tests.",
        thumbnail: "https://images.unsplash.com/photo-1620912189863-010350284897?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80",
        instructor: "Expert Engineering Team",
        price: 3499,
        originalPrice: 4999,
        rating: 4.9,
        students: 15400,
        duration: "12 Months",
        isLive: true,
        level: "Class 12",
        daysLeft: 5,
        category: "JEE",
        tabs: ["Curriculum", "Materials", "Announcements"],
        curriculum: [
            { id: 1, title: "Introduction to Mechanics", duration: "45 mins", type: "video", isCompleted: true, isLocked: false },
            { id: 2, title: "Laws of Motion", duration: "60 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 3, title: "Practice Worksheet - 1", duration: "30 mins", type: "worksheet", isCompleted: false, isLocked: true },
            { id: 4, title: "Work, Energy & Power", duration: "55 mins", type: "video", isCompleted: false, isLocked: true },
        ],
    },
    {
        id: "2",
        title: "NEET Success Batch 2026",
        description: "The most comprehensive NEET preparation course with expert medical faculty. Covers Biology, Physics, and Chemistry with special focus on high-weightage topics.",
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        instructor: "Top Medical Faculty",
        price: 3999,
        originalPrice: 5999,
        rating: 4.8,
        students: 22000,
        duration: "12 Months",
        isLive: true,
        level: "Class 11",
        daysLeft: 2,
        category: "NEET",
        tabs: ["Curriculum", "Materials", "Announcements"],
        curriculum: [
            { id: 1, title: "Cell Biology Fundamentals", duration: "50 mins", type: "video", isCompleted: true, isLocked: false },
            { id: 2, title: "Human Physiology - I", duration: "70 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 3, title: "Chapter Test - Biology", duration: "45 mins", type: "worksheet", isCompleted: false, isLocked: true },
            { id: 4, title: "Genetics & Evolution", duration: "65 mins", type: "video", isCompleted: false, isLocked: true },
        ],
    },
    {
        id: "3",
        title: "UPSC CSE 2026 Foundation",
        description: "Start your UPSC journey with a strong foundation. Covers GS Papers 1–4, CSAT, and optional subjects with guidance from IAS, IPS, and IFS officers.",
        thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        instructor: "Top IAS Officers",
        price: 9999,
        originalPrice: 19999,
        rating: 4.7,
        students: 5000,
        duration: "18 Months",
        isLive: false,
        level: "Graduate",
        category: "UPSC",
        tabs: ["Curriculum", "Materials", "Announcements"],
        curriculum: [
            { id: 1, title: "Indian History - Ancient Period", duration: "90 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 2, title: "Indian Polity - Constitution", duration: "80 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 3, title: "Current Affairs - Jan 2026", duration: "60 mins", type: "worksheet", isCompleted: false, isLocked: true },
            { id: 4, title: "Economy & Development", duration: "75 mins", type: "video", isCompleted: false, isLocked: true },
        ],
    },
    {
        id: "4",
        title: "Full Stack Web Development",
        description: "Become a full-stack developer with React, Node.js, MongoDB, and more. Build 10+ real-world projects and get job-ready in 6 months.",
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1631&q=80",
        instructor: "Hitesh Choudhary",
        price: 2999,
        originalPrice: 6999,
        rating: 4.9,
        students: 12000,
        duration: "6 Months",
        isLive: true,
        level: "Beginner",
        daysLeft: 10,
        category: "Coding",
        tabs: ["Curriculum", "Materials", "Announcements"],
        curriculum: [
            { id: 1, title: "HTML & CSS Foundations", duration: "60 mins", type: "video", isCompleted: true, isLocked: false },
            { id: 2, title: "JavaScript Essentials", duration: "90 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 3, title: "JS Assignment - 1", duration: "30 mins", type: "worksheet", isCompleted: false, isLocked: true },
            { id: 4, title: "React Fundamentals", duration: "120 mins", type: "video", isCompleted: false, isLocked: true },
        ],
    },
    {
        id: "5",
        title: "GATE CSE 2026 - Elite",
        description: "Crack GATE with India's finest Computer Science faculty. Covers all GATE CSE topics with previous year analysis, mock tests, and live sessions.",
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        instructor: "GATE Experts Team",
        price: 5999,
        originalPrice: 9999,
        rating: 4.8,
        students: 8000,
        duration: "12 Months",
        isLive: false,
        level: "Engineering",
        category: "GATE",
        tabs: ["Curriculum", "Materials", "Announcements"],
        curriculum: [
            { id: 1, title: "Data Structures - Arrays", duration: "75 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 2, title: "Algorithms - Sorting", duration: "80 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 3, title: "GATE PYQ Test", duration: "180 mins", type: "worksheet", isCompleted: false, isLocked: true },
            { id: 4, title: "OS - Process Management", duration: "70 mins", type: "video", isCompleted: false, isLocked: true },
        ],
    },
    {
        id: "6",
        title: "MBA Comprehensive 2025",
        description: "Prepare for CAT, XAT, GMAT and more with expert MBA faculty. Covers Quantitative Aptitude, Verbal, Data Interpretation, and Logical Reasoning.",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1630&q=80",
        instructor: "Top MBA Faculty",
        price: 4999,
        originalPrice: 8999,
        rating: 4.6,
        students: 3000,
        duration: "8 Months",
        isLive: true,
        level: "Graduate",
        daysLeft: 15,
        category: "MBA",
        tabs: ["Curriculum", "Materials", "Announcements"],
        curriculum: [
            { id: 1, title: "Quantitative Aptitude - Numbers", duration: "60 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 2, title: "Verbal Ability - RC", duration: "50 mins", type: "video", isCompleted: false, isLocked: false },
            { id: 3, title: "DI Practice Set", duration: "45 mins", type: "worksheet", isCompleted: false, isLocked: true },
            { id: 4, title: "Logical Reasoning - Puzzles", duration: "55 mins", type: "video", isCompleted: false, isLocked: true },
        ],
    },
];

// Mock: IDs of courses the logged-in student is enrolled in (fallback when API not used).
export const ENROLLED_COURSE_IDS: string[] = ["1"];

// Cache populated by fetchCoursePageData — used by getCourseById / isEnrolledIn when set
let coursesCache: CourseItem[] | null = null;
let enrolledIdsCache: string[] | null = null;

export function setCourseDataCache(courses: CourseItem[], enrolledIds: string[]) {
    coursesCache = courses;
    enrolledIdsCache = enrolledIds;
}

function getFirst<T>(obj: unknown, ...keys: string[]): T | undefined {
    if (obj == null || typeof obj !== "object") return undefined;
    const o = obj as Record<string, unknown>;
    for (const k of keys) {
        const v = o[k];
        if (v !== undefined && v !== null) return v as T;
    }
    return undefined;
}

function mapApiCourseToItem(raw: unknown, index: number): CourseItem {
    const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
    const id = String(getFirst<string>(o, "courseCode", "id", "courseId", "course_id") ?? index + 1);
    const title = String(getFirst<string>(o, "title", "courseName", "name", "course_name") ?? "Course");
    const description = String(getFirst<string>(o, "description", "courseDescription", "desc") ?? "");
    let thumbnail = String(getFirst<string>(o, "thumbnail", "image", "thumbnailUrl", "imageUrl", "thumbnail_url", "image_url") ?? "");
    if (thumbnail.startsWith("/")) {
        thumbnail = `https://clussplus.auby.in${thumbnail}`;
    }
    const instructor = String(getFirst<string>(o, "instructor", "teacherName", "instructorName", "teacher_name") ?? "");
    const price = Number(getFirst<number>(o, "discountedprice", "price", "sellingPrice", "selling_price")) || 0;
    const originalPrice = Number(getFirst<number>(o, "mrp", "originalPrice", "actualPrice", "actual_price")) || price || 999;
    const rating = Number(getFirst<number>(o, "rating", "avgRating", "avg_rating")) || 0;
    const students = Number(getFirst<number>(o, "totalenrollment", "students", "enrolledCount", "enrolled_count")) || 0;
    const duration = String(getFirst<string>(o, "duration", "courseDuration", "course_duration") ?? "");
    const isLive = Boolean(getFirst<boolean>(o, "isLive", "is_live"));
    const category = String(getFirst<string>(o, "category", "courseCategory", "course_category") ?? "");
    const courseType = String(getFirst<string>(o, "courseType", "course_type") ?? "");
    const board = String(getFirst<string>(o, "board") ?? "");
    const classname = String(getFirst<string>(o, "classname", "class_name") ?? "");
    const subject = String(getFirst<string>(o, "subject") ?? "");
    const medium = String(getFirst<string>(o, "medium") ?? "");
    const totalLessons = Number(getFirst<number>(o, "totalLessons", "total_lessons")) || 0;
    const difficulty = String(getFirst<string>(o, "difficulty", "courseDifficulty") ?? "");
    const rawCurriculum = getFirst<unknown[]>(o, "curriculum", "chapters", "modules", "lessons", "syllabus");
    const curriculum = Array.isArray(rawCurriculum)
        ? rawCurriculum.slice(0, 20).map((item, i) => {
            const r = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
            return {
                id: Number(getFirst<number>(r, "id", "lessonId", "lesson_id")) || i + 1,
                title: String(getFirst<string>(r, "title", "name", "lessonName", "lesson_name") ?? "Lesson"),
                duration: String(getFirst<string>(r, "duration", "durationMinutes", "duration_minutes") ?? ""),
                type: (String(getFirst<string>(r, "type", "contentType", "content_type") ?? "video").toLowerCase().includes("sheet") || String(getFirst<string>(r, "type")).toLowerCase() === "worksheet" ? "worksheet" : "video") as "video" | "worksheet",
                isCompleted: Boolean(getFirst<boolean>(r, "isCompleted", "is_completed", "completed")),
                isLocked: Boolean(getFirst<boolean>(r, "isLocked", "is_locked", "locked")),
            };
        })
        : [
            { id: 1, title: "Introduction", duration: "", type: "video" as const, isCompleted: false, isLocked: false },
        ];
    return {
        id,
        title,
        description,
        thumbnail,
        instructor,
        price,
        originalPrice,
        rating,
        students,
        duration,
        isLive,
        category,
        courseType,
        board,
        classname,
        subject,
        medium,
        totalLessons,
        difficulty,
        tabs: ["Curriculum", "Materials", "Announcements"],
        curriculum,
    };
}

/** Extract courses array and enrolled IDs from various backend response shapes */
function mapApiResponseToCourseData(response: unknown): { courses: CourseItem[]; enrolledIds: string[] } {
    const o = (response && typeof response === "object" ? response : {}) as Record<string, unknown>;
    // Handle { data: [...] } or { data: { allCourses: [], mycourses: [] } }
    const data = getFirst<unknown>(o, "data", "result") ?? o;

    let rawCourses: unknown[] = [];
    let enrolledIds: string[] = [];

    if (Array.isArray(data)) {
        // Handle { data: [ { courseCode, enrollmentStatus }, ... ] }
        rawCourses = data;
        data.forEach((c, i) => {
            const r = (c && typeof c === "object" ? c : {}) as Record<string, unknown>;
            const isEnrolled = Number(getFirst<number>(r, "enrollmentStatus", "isEnrolled", "is_enrolled")) > 0 ||
                Boolean(getFirst<boolean>(r, "enrolled"));
            if (isEnrolled) {
                enrolledIds.push(String(getFirst<string>(r, "courseCode", "id", "courseId", "course_id") ?? i + 1));
            }
        });
    } else if (data && typeof data === "object") {
        const dataObj = data as Record<string, unknown>;
        rawCourses = getFirst<unknown[]>(dataObj, "allCourses") ??
            getFirst<unknown[]>(o, "courses") ??
            getFirst<unknown[]>(dataObj, "courses", "courseList", "course_list", "list") ?? [];

        const rawMyCourses = getFirst<unknown[]>(dataObj, "mycourses");
        if (Array.isArray(rawMyCourses)) {
            enrolledIds = rawMyCourses.map(c => {
                const r = (c && typeof c === "object" ? c : {}) as Record<string, unknown>;
                return String(getFirst<string>(r, "courseCode", "id", "courseId", "course_id"));
            });
        } else {
            const rawEnrolled = getFirst<unknown[]>(o, "enrolledCourseIds", "enrolledIds", "enrolled_ids") ??
                getFirst<unknown[]>(dataObj, "enrolledCourseIds", "enrolledIds", "enrolled_ids");
            if (Array.isArray(rawEnrolled)) {
                enrolledIds = rawEnrolled.map((x) => String(x));
            } else if (Array.isArray(rawCourses)) {
                rawCourses.forEach((c, i) => {
                    const r = (c && typeof c === "object" ? c : {}) as Record<string, unknown>;
                    const isEnrolled = Number(getFirst<number>(r, "enrollmentStatus", "isEnrolled", "is_enrolled")) > 0 ||
                        Boolean(getFirst<boolean>(r, "enrolled"));
                    if (isEnrolled) {
                        enrolledIds.push(String(getFirst<string>(r, "id", "courseId", "course_id") ?? i + 1));
                    }
                });
            }
        }
    } else if (Array.isArray(response)) {
        rawCourses = response;
    }

    const courses = Array.isArray(rawCourses) ? rawCourses.map(mapApiCourseToItem) : [];
    return { courses, enrolledIds };
}

const DEFAULT_STUDENT_ID = ""; // No default, should come from auth/env

/** In the browser we use our own API proxy to avoid mixed content (HTTPS page → HTTP API). */
function getCoursePageDataUrl(studentId: string): string {
    if (typeof window !== "undefined") {
        return `/api/proxy/api/android/coursepagedata/${encodeURIComponent(studentId)}`;
    }
    return `${COURSE_API_BASE}${COURSE_PATHS.coursePageData(studentId)}`;
}

export async function fetchCoursePageData(studentId?: string): Promise<{ courses: CourseItem[]; enrolledIds: string[] }> {
    const id = studentId ?? (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_STUDENT_ID : undefined);

    // If no ID is available, we can't fetch personalized course data.
    if (!id) {
        return { courses: COURSES, enrolledIds: [] };
    }

    const url = getCoursePageDataUrl(id);
    console.log("[DEBUG] Fetching course data from:", url);
    const token = typeof window !== "undefined" ? localStorage.getItem("cp_token") : null;
    const headers: Record<string, string> = {
        "Accept": "application/json"
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const res = await fetch(url, { headers });
        console.log("[DEBUG] Fetch status:", res.status);
        if (!res.ok) throw new Error(`Course data failed: ${res.status}`);
        const json: unknown = await res.json();
        console.log("[DEBUG] Raw API Response:", json);
        const { courses, enrolledIds } = mapApiResponseToCourseData(json);
        console.log("[DEBUG] Mapped courses count:", courses.length);
        setCourseDataCache(courses, enrolledIds);
        return { courses, enrolledIds };
    } catch (err) {
        console.error("[DEBUG] Fetch error:", err);
        throw err;
    }
}

export function getCourses(): CourseItem[] {
    return coursesCache ?? COURSES;
}

export function getCourseById(id: string): CourseItem | undefined {
    return getCourses().find((c) => c.id === id);
}

export function getEnrolledCourseIds(): string[] {
    return enrolledIdsCache ?? ENROLLED_COURSE_IDS;
}

export function isEnrolledIn(courseId: string): boolean {
    return getEnrolledCourseIds().includes(courseId);
}

export function useCoursePageData(studentId?: string) {
    const [courses, setCourses] = useState<CourseItem[]>(() => coursesCache ?? COURSES);
    const [enrolledIds, setEnrolledIds] = useState<string[]>(() => enrolledIdsCache ?? ENROLLED_COURSE_IDS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { courses: nextCourses, enrolledIds: nextEnrolledIds } = await fetchCoursePageData(studentId);
            setCourses(nextCourses);
            setEnrolledIds(nextEnrolledIds);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load courses");
            setCourses(COURSES);
            setEnrolledIds(ENROLLED_COURSE_IDS);
        } finally {
            setLoading(false);
        }
    }, [studentId]);

    useEffect(() => {
        // Only run if we actually have a studentId or we want to try the env fallback
        const effectiveId = studentId ?? (typeof process !== "undefined" ? process.env?.NEXT_PUBLIC_COURSE_USER_ID : undefined);
        if (effectiveId) {
            refetch();
        } else {
            setLoading(false);
        }
    }, [studentId, refetch]);

    return { courses, enrolledIds, loading, error, refetch };
}
