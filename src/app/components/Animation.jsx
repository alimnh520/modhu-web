'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from '../Provider';
import NoticeBar from './Notice';

const Animation = () => {
    const { scrollPath } = useContext(UserContext);
    const [activeIndex, setActiveIndex] = useState(0);
    const animateImg = [
        { img: "/animation/img1.jpg", title: "প্রাকৃতিক মধু", desc: "বিশুদ্ধতা আর গুণগত মানের নিশ্চয়তা" },
        { img: "/animation/img3.jpg", title: "স্বর্ণমধু", desc: "বিশ্বস্ততার সাথে মধুর স্বাদ" },
        { img: "/animation/img4.jpg", title: "স্বাস্থ্যকর জীবন", desc: "প্রতিদিনের জন্য প্রাকৃতিক সমাধান" },
        { img: "/animation/img2.jpg", title: "বিশ্বাসের ব্র্যান্ড", desc: "গুণ, মান আর ভালোবাসার প্রতীক" },
    ];

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % animateImg.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? animateImg.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % animateImg.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const scrollToHoney = () => {
        scrollPath.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="w-full flex flex-col items-center py-1.5 sm:py-2 px-1">
            {/* Image Slider */}
            <div className="relative w-full max-w-7xl h-[190px] sm:h-[350px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden sm:rounded-2xl rounded-lg shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeIndex}
                        src={animateImg[activeIndex].img}
                        alt="slider"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="max-h-full max-w-full object-contain sm:rounded-2xl rounded-lg"
                    />
                </AnimatePresence>

                {/* Navigation */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-gradient-to-b from-yellow-900/40 via-yellow-600/40 to-yellow-500/40 rounded-full hover:text-yellow-400 text-white text-2xl sm:text-3xl drop-shadow-lg transition"
                >
                    <CiCircleChevLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-gradient-to-b from-yellow-900/40 via-yellow-600/40 to-yellow-500/40 rounded-full hover:text-yellow-400 text-white text-2xl sm:text-3xl drop-shadow-lg transition"
                >
                    <CiCircleChevRight />
                </button>

                {/* Indicators */}
                <div className="absolute hidden sm:flex bottom-4 left-1/2 -translate-x-1/2 gap-3">
                    {animateImg.map((_, i) => (
                        <div
                            key={i}
                            className={`sm:w-3 h-1 sm:h-3 w-1 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                                ? "bg-yellow-700 scale-110"
                                : "bg-yellow-400/80 hover:bg-yellow-700"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>

                <motion.button
                    key={activeIndex}
                    alt="slider"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                    mt-6 absolute sm:bottom-8 bottom-2 left-1/2 -translate-x-1/2
                    px-2 py-1 text-[12px]
                    sm:px-6 sm:py-2.5 sm:text-base
                    md:px-8 md:py-3 md:text-lg
                    rounded-lg font-semibold
                    bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-500
                     text-black hover:text-white
                     shadow-md hover:shadow-xl
                     transitio"
                    onClick={scrollToHoney}
                >
                    এখনই কিনুন
                </motion.button>

            </div>
            <NoticeBar />
        </div>
    );
};

export default Animation;
