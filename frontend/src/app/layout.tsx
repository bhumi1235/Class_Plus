import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthModal } from "@/components/auth/AuthModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClassPlus – Professional Learning Platform",
  description: "Track progress, join live classes, and manage assignments with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        {children}
        <AuthModal />
      </body>
    </html>
  );
}
