"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function DoubtPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                    <CircleHelp className="h-10 w-10 text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Doubt Clearing</h1>
                <p className="text-gray-500 text-center max-w-md mb-8">
                    Get your doubts resolved instantly by our experts. Feature coming soon!
                </p>
                <Link href="/">
                    <Button>Back to Home</Button>
                </Link>
            </main>
            <Footer />
        </div>
    );
}
