'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

// pages/category.js
export default function Category() {
    const [honeys, setHoney] = useState('');

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch('/api/product', { method: 'GET' });
                const data = await res.json();
                if (data.success) setHoney(data.message);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    }, []);

    return (
        <div className="sm:py-8 py-0 px-6">
            <div className="sm:text-4xl text-2xl font-extrabold flex items-center gap-x-3 justify-center text-amber-600 text-center sm:mb-12 mb-5">
                <div className="w-40 hidden sm:block h-0.5 bg-yellow-500"></div>
                <h1> আমাদের মধুর ক্যাটেগরি </h1>
                <img src="/category/honey.png" alt="" className="w-10 -mt-1" />
                <div className="w-40 hidden sm:block h-0.5 bg-yellow-500"></div>

            </div>

            {/* ক্যাটেগরি গ্রিড */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                {honeys ? honeys?.slice(0, 8).map((honey) => (
                    <div
                        key={honey._id}
                        className="bg-white flex items-center justify-center rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl relative hover:scale-105 transition-all duration-300"
                    >
                        {/* ছবির অংশ */}
                        <img
                            src={honey.img}
                            alt={honey.name}
                            className="w-full h-56 object-contain sm:mt-0 -mt-5"
                        />
                        {/* অর্ডার বাটন */}
                        <Link href={`/components/order/${honey._id}`} className="absolute bottom-2 bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-yellow-700 transition">
                            অর্ডার করুন
                        </Link>
                    </div>
                )) : <div className="col-span-full flex justify-center items-center py-20">
                    <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>}
            </div>
        </div>
    );
}
