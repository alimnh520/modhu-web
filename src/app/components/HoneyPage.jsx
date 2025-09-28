'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserContext } from '../Provider';

export default function HoneyPage() {
    const { setScrollPath } = useContext(UserContext);

    const scrollView = useRef(null);

    useEffect(() => {
        setScrollPath(scrollView);
    }, []);

    const [selected, setSelected] = useState(null);
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
        <div className="py-4 px-6 pb-16 sm:pt-8 pt-6" ref={scrollView}>
            <div className="sm:text-4xl text-xl font-extrabold flex items-center gap-x-3 justify-center text-amber-600 text-center sm:mb-12 mb-5">
                <div className="w-40 hidden sm:block h-0.5 bg-yellow-500"></div>
                <h1> আমাদের প্রিমিয়াম মধু কালেকশন </h1>
                <img src="/category/honey.png" alt="" className="w-10 -mt-1" />
                <div className="w-40 hidden sm:block h-0.5 bg-yellow-500"></div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:w-full">
                {honeys ? (
                    honeys.map((honey) => (
                        <motion.div
                            key={honey._id}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                        >
                            <img
                                src={honey.img}
                                alt={honey.name}
                                className="w-full h-56 object-contain cursor-pointer"
                                onClick={() => setSelected(honey)}
                            />
                            <div className="p-5 flex flex-col">
                                <h2 className="text-xl font-semibold text-yellow-500">{honey.name}</h2>
                                <p className="text-gray-500 line-through">৳{honey.discount}</p>
                                <p className="text-2xl font-bold text-green-600">৳{honey.price}</p>
                                <Link href={`/components/order/${honey._id}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 text-black font-semibold rounded-lg shadow hover:text-white"
                                    >
                                        এখনই অর্ডার করুন
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    // 🔥 লোডারকে মাঝখানে আনার জন্য flexbox ব্যবহার করা হলো
                    <div className="col-span-full flex justify-center items-center py-20">
                        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-2 sm:px-0"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-white w-full max-w-lg rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-2xl"
                            >
                                ✖
                            </button>

                            <div className="p-6">
                                <img
                                    src={selected.img}
                                    alt={selected.name}
                                    className="w-full h-56 sm:h-72 object-contain rounded-lg"
                                />
                                <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mt-4">{selected.name}</h2>
                                <p className="text-gray-600 mt-2 text-sm sm:text-base">{selected.desc}</p>

                                <div className="mt-4">
                                    <p className="text-gray-500 line-through">৳{selected.price}</p>
                                    <p className="text-2xl font-bold text-green-600">৳{selected.discount}</p>
                                </div>

                                <Link href={`/components/order/${selected._id}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-5 w-full px-6 py-3 bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500 
                        text-black font-semibold rounded-lg shadow hover:text-white"
                                    >
                                        এখনই অর্ডার করুন
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
