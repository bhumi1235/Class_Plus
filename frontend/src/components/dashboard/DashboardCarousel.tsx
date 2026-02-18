"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const CAROUSEL_ITEMS = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80",
        title: "Achieve Your Dream",
        subtitle: "Start your learning journey today",
        cta: "Enroll Now"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80",
        title: "Live Doubt Solving Sessions",
        subtitle: "Get your queries resolved instantly",
        cta: "Join Live"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        title: "New NEET Crash Course",
        subtitle: "Accelerate your preparation",
        cta: "Explore"
    }
];

export function DashboardCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    const prev = () => setCurrent((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);

    return (
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden group shadow-lg">
            {CAROUSEL_ITEMS.map((item, index) => (
                <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                >
                    {/* Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] hover:scale-105"
                        style={{ backgroundImage: `url(${item.image})` }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
                        <div className="px-8 md:px-16 max-w-2xl text-white space-y-4">
                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">{item.title}</h2>
                            <p className="text-lg md:text-xl text-gray-200">{item.subtitle}</p>
                            <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white border-none rounded-xl px-8 py-6 text-lg font-semibold shadow-xl shadow-indigo-900/20">
                                {item.cta}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {CAROUSEL_ITEMS.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === current ? "w-8 bg-indigo-500" : "bg-white/50 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
