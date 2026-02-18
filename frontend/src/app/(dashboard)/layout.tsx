import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-7xl">
                {children}
            </main>
        </div>
    );
}
