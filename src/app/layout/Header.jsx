'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathName = usePathname();
    const [selectedPath, setSelectedPath] = useState('হোম');

    const links = [
        { name: 'হোম', href: '/' },
        { name: 'আমাদের সম্পর্কে', href: '/components/about' },
        { name: 'যোগাযোগ', href: '/components/contact' },
        { name: 'ড্যাশবোর্ড', href: '/dashboard' },
    ];

    return (
        <header className="w-full bg-amber-50 fixed top-0 left-0 z-50">
            <div className="backdrop-blur-lg shadow-lg border-b border-amber-200">
                <div className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center h-16 sm:h-20">
                    {/* লোগো */}
                    <div className="flex items-center gap-4">
                        <img
                            src="/logo/my-logo.png"
                            alt="লোগো"
                            className="h-[60px] sm:h-[75px] object-contain"
                        />
                        <p className="text-2xl sm:text-4xl font-bold text-amber-600 drop-shadow">
                            স্বর্ণমধু
                        </p>
                    </div>

                    {/* ডেস্কটপ মেনু */}
                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((link) => {
                            const active = pathName === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative font-medium transition-colors 
                                        ${active ? "text-amber-600 border-b-2 border-b-amber-600" : "text-amber-500 hover:text-amber-600"}`}
                                >
                                    {link.name}
                                    <span
                                        className={`absolute left-0 -bottom-1 h-0.5 bg-amb6text-amber-600 transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                                    ></span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* মোবাইল মেনু বাটন */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-amber-600 hover:text-yellow-600 transition"
                        >
                            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* মোবাইল মেনু animation সহ */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-yellow-200 z-30"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-0 left-0 w-64 h-screen bg-amber-50 shadow-lg z-40"
                        >
                            <div className="flex justify-between items-center px-7 py-4 border-b border-b-amber-100">
                                <p className="text-amber-600 font-bold">{selectedPath}</p>
                            </div>
                            <nav className="flex flex-col gap-4 p-4">
                                {links.map((link) => {
                                    const active = pathName === link.href;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => {
                                                setSelectedPath(link.name);
                                                setMobileMenuOpen(false);
                                            }}
                                            className={`text-base font-medium transition px-3 py-2 rounded-md
                  ${active ? "bg-yellow-100 text-amber-600" : "hover:bg-yellow-50 hover:text-amber-600"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </header>
    );
}
