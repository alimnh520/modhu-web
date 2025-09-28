'use client'
import React, { useEffect, useState } from "react";

export default function NoticeBar() {
    const [notice, setNotice] = useState("");

    useEffect(() => {
        // 🔔 নোটিস API থেকে ডেটা আনবে
        async function fetchNotice() {
            try {
                const res = await fetch("/api/notice");
                const data = await res.json();
                if (data.success && data.message) {
                    setNotice(data.message.text || "কোনো নোটিস পাওয়া যায়নি 🐝");
                }
            } catch (error) {
                console.error("❌ নোটিস আনার সময় সমস্যা:", error);
            }
        }
        fetchNotice();
    }, []);

    if (!notice) return null;

    return (
        <div className="w-full bg-gradient-to-r rounded-4xl from-amber-200 via-yellow-100 to-amber-200 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
                <span className="text-amber-700 sm:text-base text-sm w-24 font-semibold flex items-center gap-x-3 mr-3 animate-pulse">
                    🔔 নোটিস:
                </span>
                <marquee
                    behavior="scroll"
                    direction="left"
                    scrollamount="5"
                    className="text-amber-800 font-medium"
                >
                    {notice}
                </marquee>
            </div>
        </div>
    );
}
