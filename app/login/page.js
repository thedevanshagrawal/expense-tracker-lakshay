"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { CreditCard, Mail, Lock, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset error before login attempt
        setSuccess("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password. Please try again.");
            } else {
                setSuccess("Login successful! Redirecting...");
                setTimeout(() => {
                    router.push("/transaction");
                }, 1000);
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (session?.user) {
            router.push("/transaction");
        }
    }, [session, router]);

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
                    <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">
                        Sign in to access your expense tracker
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
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="pl-10 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none shadow-sm pr-10"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link href="/forgot-password">
                                <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                    Forgot password?
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-3 rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : "Sign In"}
                        </button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.033s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.787-1.676-4.188-2.701-6.735-2.701-5.518 0-9.99 4.473-9.99 9.99s4.473 9.99 9.99 9.99c8.127 0 9.9-7.685 9.054-11.647l-9.054 0.001z"></path>
                            </svg>
                            <span className="ml-2">Google</span>
                        </button>
                        <button
                            type="button"
                            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0.4c-5.3 0-9.6 4.3-9.6 9.6 0 4.2 2.8 7.9 6.6 9.2 0.5 0.1 0.7-0.2 0.7-0.5 0-0.2 0-0.9 0-1.7-2.7 0.6-3.3-1.3-3.3-1.3-0.4-1.1-1.1-1.4-1.1-1.4-0.9-0.6 0.1-0.6 0.1-0.6 1 0.1 1.5 1 1.5 1 0.9 1.5 2.4 1.1 2.9 0.8 0.1-0.6 0.4-1.1 0.6-1.3-2.1-0.2-4.3-1.1-4.3-4.8 0-1.1 0.4-1.9 1-2.6-0.1-0.3-0.4-1.3 0.1-2.7 0 0 0.8-0.3 2.8 1 0.8-0.2 1.6-0.3 2.5-0.3 0.8 0 1.7 0.1 2.5 0.3 1.9-1.3 2.8-1 2.8-1 0.5 1.4 0.2 2.4 0.1 2.7 0.6 0.7 1 1.6 1 2.6 0 3.7-2.2 4.6-4.3 4.8 0.4 0.3 0.7 0.9 0.7 1.9 0 1.3 0 2.4 0 2.8 0 0.3 0.2 0.6 0.7 0.5 3.9-1.3 6.6-5 6.6-9.2 0-5.3-4.3-9.6-9.6-9.6z"></path>
                            </svg>
                            <span className="ml-2">GitHub</span>
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center">
                    <span className="text-sm text-gray-600">Don't have an account?</span>
                    <Link href="/register">
                        <span className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                            Sign up
                        </span>
                    </Link>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to our
                        <a href="#" className="text-indigo-600 hover:text-indigo-500"> Terms of Service </a>
                        and
                        <a href="#" className="text-indigo-600 hover:text-indigo-500"> Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;