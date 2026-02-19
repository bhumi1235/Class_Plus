"use client";

import { useState } from "react";
import { User, Bell, Lock, Palette, Globe, CreditCard, LogOut, Save, Sun, Moon, Monitor, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

type Theme = "light" | "dark" | "system";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [selectedTheme, setSelectedTheme] = useState<Theme>("light");

    const tabs = [
        { id: "profile", label: "Profile", icon: User, description: "Personal information" },
        { id: "notifications", label: "Notifications", icon: Bell, description: "Alert preferences" },
        { id: "security", label: "Security", icon: Lock, description: "Password & 2FA" },
        { id: "appearance", label: "Appearance", icon: Palette, description: "Theme settings" },
        { id: "language", label: "Language", icon: Globe, description: "Language & region" },
        { id: "billing", label: "Billing", icon: CreditCard, description: "Subscription & payments" },
    ];

    const themeOptions = [
        {
            id: "light" as Theme,
            label: "Light",
            icon: Sun,
            description: "Clean and bright",
            preview: "bg-white border-gray-200"
        },
        {
            id: "dark" as Theme,
            label: "Dark",
            icon: Moon,
            description: "Easy on the eyes",
            preview: "bg-gray-900 border-gray-700"
        },
        {
            id: "system" as Theme,
            label: "System",
            icon: Monitor,
            description: "Match your device",
            preview: "bg-gradient-to-br from-white to-gray-900 border-gray-400"
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Enhanced Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="overflow-hidden">
                        <CardContent className="p-2">
                            <nav className="space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all group ${isActive
                                                ? 'bg-indigo-50 text-indigo-700 shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-sm font-semibold ${isActive ? 'text-indigo-700' : 'text-gray-900'}`}>
                                                    {tab.label}
                                                </div>
                                                <div className={`text-xs mt-0.5 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                                                    {tab.description}
                                                </div>
                                            </div>
                                            {isActive && (
                                                <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2"></div>
                                            )}
                                        </button>
                                    );
                                })}
                                <div className="pt-2 mt-2 border-t border-gray-200">
                                    <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition-all group">
                                        <LogOut className="h-5 w-5 flex-shrink-0" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </nav>
                        </CardContent>
                    </Card>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">
                    {activeTab === "profile" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700">
                                        JD
                                    </div>
                                    <div>
                                        <Button variant="outline" size="sm">Change Photo</Button>
                                        <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <Input defaultValue="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <Input defaultValue="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <Input type="email" defaultValue="john.doe@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        rows={3}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "notifications" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Manage how you receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { title: "Email Notifications", description: "Receive email updates about your courses" },
                                    { title: "Push Notifications", description: "Get push notifications on your device" },
                                    { title: "Assignment Reminders", description: "Reminders for upcoming assignments" },
                                    { title: "Live Class Alerts", description: "Notifications before live classes start" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.description}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "security" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your password and security options</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <Input type="password" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <Input type="password" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <Input type="password" />
                                </div>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">Update Password</Button>

                                <div className="pt-6 mt-6 border-t border-gray-200">
                                    <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Enable 2FA</p>
                                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                                        </div>
                                        <Badge variant="secondary">Coming Soon</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "appearance" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize how ClassPlus looks on your device</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-4">Theme Preference</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {themeOptions.map((theme) => {
                                            const Icon = theme.icon;
                                            const isSelected = selectedTheme === theme.id;
                                            return (
                                                <button
                                                    key={theme.id}
                                                    onClick={() => setSelectedTheme(theme.id)}
                                                    className={`relative p-4 border-2 rounded-xl transition-all group ${isSelected
                                                        ? 'border-indigo-600 bg-indigo-50 shadow-md'
                                                        : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                                                        }`}
                                                >
                                                    {/* Theme Preview */}
                                                    <div className={`h-24 rounded-lg border-2 mb-3 ${theme.preview} transition-transform group-hover:scale-105`}>
                                                        <div className="h-full w-full flex items-center justify-center">
                                                            <Icon className={`h-8 w-8 ${isSelected ? 'text-indigo-600' : 'text-gray-400'}`} />
                                                        </div>
                                                    </div>

                                                    {/* Theme Info */}
                                                    <div className="text-center">
                                                        <div className={`font-semibold mb-1 ${isSelected ? 'text-indigo-700' : 'text-gray-900'}`}>
                                                            {theme.label}
                                                        </div>
                                                        <div className={`text-xs ${isSelected ? 'text-indigo-600' : 'text-gray-500'}`}>
                                                            {theme.description}
                                                        </div>
                                                    </div>

                                                    {/* Selected Indicator */}
                                                    {isSelected && (
                                                        <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                                            <Check className="h-4 w-4 text-white" />
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {selectedTheme === "system" && (
                                        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <p className="text-sm text-blue-900">
                                                <strong>System theme:</strong> ClassPlus will automatically switch between light and dark modes based on your device settings.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    <Save className="h-4 w-4 mr-2" />
                                    Apply Theme
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "language" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Language & Region</CardTitle>
                                <CardDescription>Set your preferred language and region</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                        <option>English (US)</option>
                                        <option>Hindi</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                        <option>IST (GMT+5:30)</option>
                                        <option>PST (GMT-8)</option>
                                        <option>EST (GMT-5)</option>
                                    </select>
                                </div>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">Save Preferences</Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === "billing" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Billing & Subscription</CardTitle>
                                <CardDescription>Manage your subscription and payment methods</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-green-900">Premium Plan</h4>
                                            <p className="text-sm text-green-700">Active until Feb 17, 2025</p>
                                        </div>
                                        <Badge className="bg-green-600">Active</Badge>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <h4 className="font-medium text-gray-900 mb-3">Payment Methods</h4>
                                    <div className="space-y-2">
                                        <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:border-gray-300 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-14 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs">
                                                    VISA
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">•••• 4242</p>
                                                    <p className="text-sm text-gray-500">Expires 12/25</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Remove</Button>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full mt-4">Add Payment Method</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
