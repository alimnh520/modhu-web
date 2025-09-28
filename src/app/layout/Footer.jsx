'use client'
import { useContext } from 'react';
import { FaFacebookF, FaWhatsapp, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { UserContext } from '../Provider';

export default function Footer() {
    const { scrollPath } = useContext(UserContext);
    const scrollToHoney = () => {
        scrollPath.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="bg-amber-50 text-yellow-500 mt-px shadow-inner">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 sm:gap-10 gap-4 pt-8">

                {/* Logo & About */}
                <div className="space-y-4 flex flex-col items-start">
                    <div className="flex items-center space-x-3 -mt-5">
                        <img
                            src="/logo/my-logo.png"
                            alt="লোগো"
                            className="h-[60px] sm:h-[75px] object-contain"
                        />
                        <p className="text-2xl sm:text-4xl font-bold text-yellow-500 drop-shadow">
                            স্বর্ণমধু
                        </p>
                    </div>
                    <p className="text-sm text-amber-600">
                        আমরা প্রাকৃতিক ও স্বাস্থ্যকর মধু সরবরাহে প্রতিশ্রুতিবদ্ধ। সরাসরি সুন্দরবন এবং গ্রামীণ অঞ্চল থেকে সংগ্রহ করা চার প্রকার খাঁটি মধু অনলাইনে পৌঁছে দিই আপনার দরজায়। স্বাস্থ্য, শক্তি এবং প্রাকৃতিক সুস্থতাই আমাদের লক্ষ্য।
                    </p>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold border-b border-b-yellow-400">ক্যাটাগরি</h3>
                    <div className="flex items-center justify-between">
                        <ul className="space-y-2 list-disc list-outside text-amber-600">
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">সরিষা ফুলের মধু</button></li>
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">কালোজিরা ফুলের মধু</button></li>
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">খলিশা ফুলের মধু</button></li>
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">ধনিয়া ফুলের মধু</button></li>
                        </ul>
                        <ul className="space-y-2 list-disc list-outside text-amber-600">
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">লিচু ফুলের মধু</button></li>
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">বরই ফুলের মধু</button></li>
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">প্রাকৃতিক চাকের মধু</button></li>
                            <li><button onClick={scrollToHoney} className="hover:text-yellow-600 cursor-pointer transition">মিশ্র ফুলের মধু</button></li>
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold border-b border-b-yellow-400">যোগাযোগ করুন</h3>
                    <div className="flex items-center space-x-2 text-amber-600">
                        <FaPhoneAlt />
                        <span>+880 1759-421646</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600">
                        <FaEnvelope />
                        <span>info@honeyshop.com</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-600">
                        <FaMapMarkerAlt />
                        <span>খুলনা সিটি, বাংলাদেশ</span>
                    </div>
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold border-b border-b-yellow-400">সোশ্যাল মিডিয়া</h3>
                    <div className="flex items-center space-x-4 mt-2">
                        <a href="https://www.facebook.com/share/16wn4nsprW/" target='_blank' className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-200 text-amber-800 hover:bg-amber-300 hover:text-white transition">
                            <FaFacebookF />
                        </a>
                        <a href="https://wa.link/5q154r" target='_blank' className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-200 text-amber-800 hover:bg-amber-300 hover:text-white transition">
                            <FaWhatsapp />
                        </a>
                        <a href="https://youtube.com/@driemvalleying?si=YxviKzOLGXrddPPB" target='_blank' className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-200 text-amber-800 hover:bg-amber-300 hover:text-white transition">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

            </div>

            <div className="border-t border-amber-200 mt-6 pt-4 text-center text-sm text-amber-600">
                &copy; {new Date().getFullYear()} স্বর্ণমধু ওয়েবসাইট. সর্বস্বত্ব সংরক্ষিত.
            </div>
        </footer>
    );
}
