import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                C+
                            </div>
                            <span>ClassPlus</span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            India's most trusted education platform, empowering students with quality education at affordable prices.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <SocialLink href="#" icon={<Youtube className="h-5 w-5" />} />
                            <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
                            <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
                            <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link></li>
                            <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* Courses */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Popular Courses</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/courses/jee" className="hover:text-indigo-400 transition-colors">JEE Styling</Link></li>
                            <li><Link href="/courses/neet" className="hover:text-indigo-400 transition-colors">NEET Preparation</Link></li>
                            <li><Link href="/courses/gate" className="hover:text-indigo-400 transition-colors">GATE 2026</Link></li>
                            <li><Link href="/courses/upsc" className="hover:text-indigo-400 transition-colors">UPSC CSE</Link></li>
                            <li><Link href="/courses/coding" className="hover:text-indigo-400 transition-colors">Coding & Skills</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Get in Touch</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-indigo-500 shrink-0" />
                                <span>123 Education Hub, Knowledge Park III,<br />Greater Noida, UP 201306</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-indigo-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-indigo-500 shrink-0" />
                                <span>support@classplus.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© 2026 ClassPlus Education. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
            {icon}
        </Link>
    );
}
