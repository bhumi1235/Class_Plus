"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { GraduationCap, UserCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignupPage() {
    const [role, setRole] = useState<"student" | "parent">("student");
    const [step, setStep] = useState(1);

    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="flex justify-center mb-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-indigo-600">
                    <GraduationCap className="h-10 w-10" />
                    <span>ClassPlus</span>
                </Link>
            </div>

            <Card className="shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Create an account
                    </CardTitle>
                    <CardDescription className="text-center">
                        Join thousands of students learning on ClassPlus
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    {/* Role Selection Removed - Defaulting to Student */}\n

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" placeholder="m@example.com" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" />
                        </div>



                        <Button className="w-full" size="lg">
                            Create Account
                        </Button>
                    </form>

                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>

            <p className="mt-6 text-center text-xs text-gray-400 max-w-sm mx-auto">
                By clicking "Create Account", you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}
