"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Code, CreditCard, IndianRupee, FileText, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EnrollmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseCode: string;
    price: number;
    courseTitle: string;
}

export function EnrollmentModal({ isOpen, onClose, courseCode, price, courseTitle }: EnrollmentModalProps) {
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        studentId: "",
        paymentMethod: "UPI",
        remarks: ""
    });

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setStep('form');
            setLoading(false);
            setFormData({
                studentId: "",
                paymentMethod: "UPI",
                remarks: ""
            });
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setLoading(false);
        setStep('success');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gray-900 px-6 py-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">Course Enrollment</h2>
                                <p className="text-gray-400 text-sm mt-0.5 line-clamp-1">{courseTitle}</p>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {step === 'form' ? (
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-500 mb-2">Fill in the details below to enroll in your chosen course</p>

                                    {/* Student ID */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Student Id</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. STU2024..."
                                                value={formData.studentId}
                                                onChange={e => setFormData({ ...formData, studentId: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Course Code (Read-only) */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Course Code</label>
                                        <div className="relative">
                                            <Code className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                readOnly
                                                value={courseCode}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 outline-none cursor-not-allowed font-mono text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <div className="h-5 border-l-4 border-indigo-600 pl-3 flex items-center">
                                            <span className="font-bold text-indigo-600">Payment Details</span>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Payment Method</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <select
                                                value={formData.paymentMethod}
                                                onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all appearance-none bg-white"
                                            >
                                                <option value="UPI">UPI (Google Pay, PhonePe, Paytm)</option>
                                                <option value="CARD">Credit / Debit Card</option>
                                                <option value="NET_BANKING">Net Banking</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Amount (Read-only) */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Amount</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <input
                                                type="text"
                                                readOnly
                                                value={price.toFixed(2)}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold outline-none cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    {/* Remarks */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Remarks</label>
                                        <div className="relative">
                                            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                            <textarea
                                                placeholder="Any specific requests or notes (Optional)"
                                                value={formData.remarks}
                                                onChange={e => setFormData({ ...formData, remarks: e.target.value })}
                                                rows={2}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all placeholder:text-gray-300 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    {loading ? (
                                        <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Enroll Now"
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <div className="p-8 text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto"
                                >
                                    <CircleCheck className="h-12 w-12" />
                                </motion.div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-gray-900">Enrollment Successful!</h3>
                                    <p className="text-gray-500">Your request has been submitted successfully. You will receive a confirmation shortly.</p>
                                </div>
                                <Button onClick={onClose} className="w-full h-12 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                                    Continue Exploring
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
