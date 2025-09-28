'use client'
// pages/contact.js
import { useEffect, useState } from "react";

export default function Contact() {

    useEffect(() => {
        document.title === 'স্বর্ণমধু || যোগাযোগ'
    }, []);

    const [form, setForm] = useState({ name: "", mobile: "", message: "" });
    const [status, setStatus] = useState({ loading: false, ok: null, msg: "" });

    const handleChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.mobile || !form.message) {
            setStatus({ loading: false, ok: false, msg: "সব ফিল্ড পূরণ করো দয়া করে।" });
            return;
        }

        setStatus({ loading: true, ok: null, msg: "পাঠানো হচ্ছে..." });

        try {
            const res = await fetch("/api/message", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus({ loading: false, ok: true, msg: "ধন্যবাদ! তোমার বার্তা পাঠানো হয়েছে।" });
                setForm({ name: "", mobile: "", message: "" });
            } else {
                console.log(data)
                setStatus({ loading: false, ok: false, msg: data?.error || "কিছু ভুল হয়েছে।" });
            }
        } catch (err) {
            setStatus({ loading: false, ok: false, msg: "সার্ভারে সমস্যা — পরে চেষ্টা করো।" });
        }
    };

    return (
        <div className="bg-yellow-50 min-h-screen py-12 px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl font-extrabold text-yellow-900 mb-4">যোগাযোগ করুন</h1>
                <p className="text-lg text-gray-700">
                    আমাদের খাঁটি মধু বা অন্য কোনো বিষয়ে জানতে চাইলে, নিচের ফর্ম পূরণ করুন অথবা
                    সরাসরি আমাদের সাথে যোগাযোগ করুন।
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                {/* যোগাযোগ তথ্য */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-yellow-800 mb-6">আমাদের ঠিকানা</h2>

                    <ul className="space-y-4 text-gray-700">
                        <li>📍 <span className="font-semibold">ঠিকানা:</span> খুলনা সিটি, বাংলাদেশ</li>
                        <li>📞 <span className="font-semibold">ফোন:</span> +880 1759-421646</li>
                        <li>📧 <span className="font-semibold">ইমেইল:</span> info@honeyshop.com</li>
                    </ul>

                    <div className="mt-8">
                        {/* যদি মাপস এমবেড লিংক থাকে, এখানে বসিয়ে দেবে */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99734.21194385654!2d89.4498626019533!3d22.84550795405857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9071cb47152f%3A0xf04b212290718952!2sKhulna!5e1!3m2!1sen!2sbd!4v1758980041755!5m2!1sen!2sbd"
                            width="100%"
                            height="340"
                            className="rounded-xl shadow-md border-0"
                            allowFullScreen=""
                            loading="lazy"
                        />
                    </div>
                </div>

                {/* কন্টাক্ট ফর্ম */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-yellow-800 mb-6">যোগাযোগ ফর্ম</h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">তোমার নাম</label>
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                type="text"
                                placeholder="তোমার নাম"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">মোবাইল</label>
                            <input
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                                type="number"
                                placeholder="+880"
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">বার্তা</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="তোমার বার্তা লিখো..."
                                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status.loading}
                            className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-yellow-700 transition disabled:opacity-60"
                        >
                            {status.loading ? "পাঠানো হচ্ছে..." : "বার্তা পাঠাও"}
                        </button>

                        {status.ok === true && (
                            <p className="mt-3 text-green-600 font-medium">{status.msg}</p>
                        )}
                        {status.ok === false && (
                            <p className="mt-3 text-red-600 font-medium">{status.msg}</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
