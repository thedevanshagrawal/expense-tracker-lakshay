"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { CreditCard, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("/api/user/register", {
                fullName,
                email,
                password,
            });

            if (response.status === 200) {
                setSuccess("Registration successful! Redirecting to login...");
                setFullName("");
                setEmail("");
                setPassword("");

                // Redirect to login after 2 seconds
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (err) {
            if (err.response?.status === 409) {
                setError("User already registered. Please log in.");
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 px-4">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center">
                            <CreditCard className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-2xl font-bold text-gray-900">SpendWise</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Create Your Account</h2>
                    <p className="text-gray-600 mt-2">
                        Start tracking your expenses and save money effectively
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 flex items-center bg-green-50 border border-green-200 text-green-700 rounded-md p-4">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 flex items-center bg-red-50 border border-red-200 text-red-700 rounded-md p-4">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="pl-10 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none shadow-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="pl-10 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none shadow-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className="pl-10 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none shadow-sm"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                            Password must be at least 8 characters
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 flex items-center justify-center">
                    <span className="text-sm text-gray-600">Already have an account?</span>
                    <Link href="/login">
                        <span className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                            Sign in
                        </span>
                    </Link>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our
                        <a href="#" className="text-indigo-600 hover:text-indigo-500"> Terms of Service </a>
                        and
                        <a href="#" className="text-indigo-600 hover:text-indigo-500"> Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;