'use client';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, password: form.password })
            });
            const data = await res.json();
            toast[data.success ? 'success' : 'error'](data.message, { position: "bottom-right" });
            if (data.success) window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("কিছু সমস্যা হয়েছে!", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title === 'স্বর্ণমধু || লগইন'
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-50 p-6 -mt-20">
            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 relative overflow-hidden">
                {/* Decorative Honey Circle */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-yellow-200 rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-300 rounded-full mix-blend-multiply opacity-50 animate-pulse"></div>

                {/* Logo */}
                <div className="flex justify-center mb-6 relative z-10">
                    <div className="bg-yellow-400 p-5 rounded-full shadow-lg flex items-center justify-center">
                        <FaUserShield className="text-white text-4xl" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center text-amber-800 mb-2 relative z-10">
                    🛒 Admin Login
                </h2>
                <p className="text-center text-amber-700 mb-8 relative z-10">
                    স্বর্ণমধু ওয়েবসাইট অ্যাডমিন একাউন্টে প্রবেশ করুন
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">ইমেইল</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="admin@example.com"
                            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-50 text-amber-900"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-amber-900 mb-1">পাসওয়ার্ড</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-yellow-50 text-amber-900"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                                    ></path>
                                </svg>
                                লোড হচ্ছে...
                            </>
                        ) : (
                            "🔐 লগইন"
                        )}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}
