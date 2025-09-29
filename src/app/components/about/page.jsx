'use client'
// pages/about.js
import Image from "next/image";
import { useEffect } from "react";

export default function About() {

    useEffect(() => {
        document.title === 'স্বর্ণমধু || সম্পর্কে'
    }, []);

    return (
        <div className="bg-yellow-50">
            <div className="sm:w-10/12 w-full mx-auto min-h-screen py-10 space-y-10 px-5">

                {/* হেডার */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h1 className="text-4xl font-extrabold text-yellow-900 mb-4">আমাদের সম্পর্কে</h1>
                    <p className="text-lg text-gray-700">
                        আমরা প্রাকৃতিক ও স্বাস্থ্যকর মধু সরবরাহে প্রতিশ্রুতিবদ্ধ। সরাসরি সুন্দরবন
                        এবং গ্রামীণ অঞ্চল থেকে সংগ্রহ করা চার প্রকার খাঁটি মধু অনলাইনে পৌঁছে দিই
                        আপনার দরজায়। স্বাস্থ্য, শক্তি এবং প্রাকৃতিক সুস্থতাই আমাদের লক্ষ্য।
                    </p>
                </div>

                {/* কালোজিরা ফুলের মধু */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img4.jpg'
                            alt="কালোজিরা ফুলের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">কালোজিরা ফুলের মধু</h2>
                        <p className="mb-4">
                            কালোজিরা ফুলের মধু একটি বিশেষ ভেষজ গুণসম্পন্ন প্রাকৃতিক খাদ্য। এতে কালোজিরার
                            অ্যান্টিঅক্সিডেন্ট ও ভিটামিন উপাদান মধুর পুষ্টিগুণের সাথে মিশে শরীরের জন্য উপকারী হয়ে ওঠে।
                        </p>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে – নিয়মিত সেবনে শরীরকে ভাইরাস ও ব্যাকটেরিয়ার আক্রমণ থেকে সুরক্ষা দেয়।</li>
                            <li>হজম শক্তি উন্নত করে – গ্যাস্ট্রিক, অম্লতা ও বদহজমে উপকার করে।</li>
                            <li>শ্বাসকষ্ট ও ঠান্ডাজনিত সমস্যায় কার্যকর – কাশি, সর্দি ও অ্যাজমার উপসর্গ কমাতে সহায়ক।</li>
                            <li>রক্তশর্করা ও কোলেস্টেরল নিয়ন্ত্রণে সাহায্য করে – ডায়াবেটিস ও হৃদরোগের ঝুঁকি হ্রাসে ভূমিকা রাখে।</li>
                            <li>শরীর ও মস্তিষ্ককে শক্তি জোগায় – ক্লান্তি কমায় ও মনোযোগ বৃদ্ধি করে।</li>
                        </ul>
                        <p className="font-semibold text-yellow-800">
                            👉 সংক্ষেপে, কালোজিরা ফুলের মধু একটি প্রাকৃতিক টনিক হিসেবে কাজ করে যা রোগ প্রতিরোধ থেকে শুরু করে সামগ্রিক সুস্থতায় সহায়তা করে।
                        </p>
                    </div>
                </div>

                {/* খলিশা ফুলের মধু */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img1.jpg'
                            alt="সুন্দরবনের খলিশা ফুলের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">সুন্দরবনের খলিশা ফুলের মধু</h2>
                        <p className="mb-4">
                            সুন্দরবনের খলিশা ফুলের মধু (Aegiceras corniculatum flower honey) বাংলাদেশে বিশেষভাবে জনপ্রিয় এবং এটি প্রাকৃতিকভাবে সুন্দরবনের মৌচাক থেকে সংগ্রহ করা হয়। সাধারণত গাঢ় রঙের হয় এবং স্বাদে একটু ঝাঁঝালো ও ভিন্ন ধরনের ঘ্রাণযুক্ত।
                        </p>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>শক্তি বৃদ্ধি করে – প্রাকৃতিক গ্লুকোজ ও ফ্রুক্টোজ থাকার কারণে এটি দ্রুত শক্তি জোগায়।</li>
                            <li>হজমে সহায়ক – খাবারের পরে খেলে হজমে সাহায্য করে এবং গ্যাস্ট্রিক সমস্যা কমাতে সহায়তা করে।</li>
                            <li>অ্যান্টিব্যাকটেরিয়াল গুণাগুণ – প্রাকৃতিক অ্যান্টিব্যাকটেরিয়াল উপাদান থাকার কারণে এটি ক্ষত সারাতে, সংক্রমণ প্রতিরোধে সহায়তা করে।</li>
                            <li>সর্দি-কাশি ও গলা ব্যথায় উপকারী – উষ্ণ পানির সঙ্গে মিশিয়ে খেলে কাশি ও গলা ব্যথা কমাতে সাহায্য করে।</li>
                            <li>যকৃত ও কিডনির জন্য উপকারী – টক্সিন দূর করতে ও লিভারকে সুস্থ রাখতে সহায়ক হিসেবে ব্যবহৃত হয়।</li>
                            <li>রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে – অ্যান্টিঅক্সিডেন্ট থাকার কারণে শরীরকে বিভিন্ন সংক্রমণ ও রোগ থেকে সুরক্ষা দেয়।</li>
                            <li>চর্মের যত্নে সহায়ক – মুখে ফেসপ্যাক হিসেবে ব্যবহার করলে ব্রণ ও দাগ দূর করতে সাহায্য করে।</li>
                            <li>ডায়াবেটিস রোগীদের জন্য সীমিতভাবে উপকারী – সামান্য পরিমাণে খেলে উপকার পাওয়া যায় (তবে চিকিৎসকের পরামর্শে)।</li>
                        </ul>
                        <p className="font-semibold text-yellow-800">
                            👉 সংক্ষেপে বলা যায়, সুন্দরবনের খলিশা ফুলের মধু শুধু খাবার হিসেবে নয়, প্রাকৃতিক ভেষজ ওষুধ হিসেবেও কার্যকর। অবশ্যই 🌼
                        </p>
                    </div>
                </div>

                {/* সরিষা ফুলের মধু */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img3.jpg'
                            alt="সরিষা ফুলের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">সরিষা ফুলের মধু</h2>
                        <p className="mb-4">
                            সরিষা ফুলের মধু আমাদের দেশে বহুল পরিচিত ও জনপ্রিয় এক ধরনের প্রাকৃতিক মধু।
                        </p>
                        <h3 className="text-xl font-semibold mb-2">🍯 উৎপত্তি</h3>
                        <p className="mb-4">
                            শীতকালে বাংলাদেশের গ্রামীণ এলাকায় প্রচুর সরিষা ফুল ফোটে। মৌমাছি সরিষা ফুল থেকে মধু সংগ্রহ করে,
                            যা সাধারণত হালকা হলুদ বা সোনালি রঙের হয়।
                        </p>
                        <h3 className="text-xl font-semibold mb-2">🍯 বৈশিষ্ট্য</h3>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>রঙ: হালকা হলুদ থেকে সোনালি রঙের।</li>
                            <li>স্বাদ: মিষ্টি ও হালকা ঝাঁঝালো (সরিষার নিজস্ব স্বাদের কারণে)।</li>
                            <li>ঘ্রাণ: ফুলের হালকা সুগন্ধযুক্ত।</li>
                            <li>ঘনত্ব: তুলনামূলকভাবে পাতলা এবং দ্রুত জমাট বাঁধে।</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-2">🍯 উপকারিতা</h3>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>শক্তি বৃদ্ধি করে – প্রাকৃতিক শর্করার উৎস হিসেবে দ্রুত শক্তি যোগায়।</li>
                            <li>অ্যান্টিব্যাকটেরিয়াল – ক্ষত সারাতে ও জীবাণুনাশক হিসেবে কাজ করে।</li>
                            <li>কাশি ও সর্দিতে উপকারী – গরম পানি বা আদার সাথে খেলে উপশম মেলে।</li>
                            <li>হজমে সহায়ক – গ্যাস, অম্লতা কমাতে সাহায্য করে।</li>
                            <li>ত্বকের যত্নে কার্যকর – ফেসপ্যাক বা মাস্কে ব্যবহার করা যায়।</li>
                        </ul>
                        <h3 className="text-xl font-semibold mb-2">🍯 সংরক্ষণ</h3>
                        <p className="font-semibold text-yellow-800">
                            কাচের বোতলে সংরক্ষণ করা ভালো। সরাসরি রোদে রাখা উচিত নয়। ঠান্ডা হলে জমাট বাঁধা স্বাভাবিক (বিশেষ করে সরিষার মধু দ্রুত জমে যায়)।
                        </p>
                    </div>
                </div>

                {/* ধনিয়া ফুলের মধু */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img2.jpg'
                            alt="ধনিয়া ফুলের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">ধনিয়া ফুলের মধু</h2>
                        <p className="mb-4">
                            ধনিয়া ফুলের মধু একটি ভেষজ গুণসম্পন্ন প্রাকৃতিক মধু, যা শরীরের জন্য নানা উপকার বয়ে আনে।
                        </p>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>হজমে সহায়ক – খাবার হজমে সাহায্য করে ও অম্লতা কমায়।</li>
                            <li>রোগ প্রতিরোধ ক্ষমতা বাড়ায় – সর্দি-কাশি ও মৌসুমি অসুস্থতার বিরুদ্ধে শরীরকে সুরক্ষা দেয়।</li>
                            <li>শরীরকে শক্তি জোগায় – ক্লান্তি কমিয়ে শরীরকে সতেজ রাখে।</li>
                            <li>অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ – রক্ত পরিশোধন ও ত্বক সুস্থ রাখতে সহায়ক।</li>
                            <li>ডায়াবেটিস ও হৃদরোগের ঝুঁকি হ্রাসে সহায়তা করে – রক্তে চিনি ও কোলেস্টেরল নিয়ন্ত্রণে ভূমিকা রাখে।</li>
                        </ul>
                        <p className="font-semibold text-yellow-800">
                            👉 সারসংক্ষেপে, ধুনিয়া ফুলের মধু একটি প্রাকৃতিক স্বাস্থ্যকর খাদ্য যা শরীর ও মনের জন্য টনিক হিসেবে কাজ করে।
                        </p>
                    </div>
                </div>

                {/* লিচু ফুল */}

                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img5.jpg'
                            alt="লিচু ফুলের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">লিচু ফুলের মধু</h2>
                        <p className="mb-4">
                            লিচু ফুলের মধু সুগন্ধি, হালকা মিষ্টি ও অনন্য স্বাদের এক প্রাকৃতিক উপহার। এতে রয়েছে ভিটামিন, খনিজ এবং অ্যান্টিঅক্সিডেন্ট যা শরীরের রোগ প্রতিরোধ ক্ষমতা বাড়াতে সাহায্য করে।
                        </p>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>শক্তি ও সতেজতা প্রদান করে – শরীরকে ক্লান্তি থেকে মুক্তি দিয়ে কর্মক্ষম রাখে।</li>
                            <li>পাচনতন্ত্রের জন্য উপকারী – হজমে সহায়তা করে এবং গ্যাস্ট্রিক ও অম্লতা কমায়।</li>
                            <li>রোগ প্রতিরোধ ক্ষমতা বাড়ায় – ব্যাকটেরিয়া ও ভাইরাসের আক্রমণ থেকে শরীরকে সুরক্ষা দেয়।</li>
                            <li>ত্বক ও সৌন্দর্যের জন্য উপকারী – প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট ত্বককে সুস্থ ও উজ্জ্বল রাখে।</li>
                            <li>হৃদরোগের ঝুঁকি কমায় – রক্তচাপ নিয়ন্ত্রণে সহায়তা করে এবং রক্ত সঞ্চালন উন্নত করে।</li>
                        </ul>
                        <p className="font-semibold text-yellow-800">
                            👉 সংক্ষেপে, লিচু ফুলের মধু শরীরের শক্তি, স্বাস্থ্য ও সৌন্দর্যের জন্য এক অনন্য প্রাকৃতিক খাদ্য।
                        </p>
                    </div>
                </div>

                {/* প্রাকৃতিক */}

                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img8.jpg'
                            alt="গ্রামের প্রাকৃতিক চাকের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">গ্রামের প্রাকৃতিক চাকের মধু</h2>
                        <p className="mb-4">
                            গ্রামের প্রাকৃতিক চাকের মধু প্রকৃতির এক অমূল্য উপহার। গ্রামীণ পরিবেশে
                            কোনো কৃত্রিম উপাদান ছাড়াই মৌমাছিরা নানা ফুল থেকে সংগ্রহ করে এই মধু তৈরি করে।
                            এর স্বাদ, ঘ্রাণ ও পুষ্টিগুণ একে করে তোলে বিশেষ।
                        </p>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>বিশুদ্ধ ও প্রাকৃতিক – কোনো প্রকার ভেজাল বা কৃত্রিম উপাদান থাকে না।</li>
                            <li>রোগ প্রতিরোধ ক্ষমতা বৃদ্ধি করে – ভাইরাস ও ব্যাকটেরিয়ার বিরুদ্ধে সুরক্ষা দেয়।</li>
                            <li>শক্তি ও পুষ্টির উৎস – শরীরকে শক্তি জোগায় এবং ক্লান্তি দূর করে।</li>
                            <li>শিশু ও বৃদ্ধদের জন্য উপকারী – সহজে হজম হয় এবং রোগ প্রতিরোধে সহায়তা করে।</li>
                            <li>প্রাকৃতিক অ্যান্টিবায়োটিক – ক্ষত বা ঘায়ের দ্রুত আরোগ্যে সাহায্য করে।</li>
                        </ul>
                        <p className="font-semibold text-yellow-800">
                            👉 সংক্ষেপে, গ্রামের প্রাকৃতিক চাকের মধু প্রকৃতির কাছ থেকে পাওয়া বিশুদ্ধতম খাদ্য,
                            যা শরীর ও মনের সুস্থতায় অনন্য ভূমিকা রাখে।
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img6.jpg'
                            alt="মিশ্র ফুলের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">মিশ্র ফুলের মধু</h2>
                        <p className="mb-4">
                            মিশ্র ফুলের মধু মৌমাছিরা বিভিন্ন ঋতুতে নানা ধরনের ফুল থেকে সংগ্রহ করে।
                            একসাথে বিভিন্ন ফুলের রস মিলে যায় বলে এর স্বাদ, ঘ্রাণ ও পুষ্টিগুণ হয় আরও অনন্য।
                            এটি প্রকৃতির এক ভারসাম্যপূর্ণ ও বহুগুণে ভরপুর উপহার।
                        </p>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>বিভিন্ন ফুলের গুণাগুণ একসাথে পাওয়া যায়।</li>
                            <li>শরীরকে শক্তি যোগায় এবং কর্মক্ষমতা বাড়ায়।</li>
                            <li>অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ – রোগ প্রতিরোধ ক্ষমতা উন্নত করে।</li>
                            <li>গলা ব্যথা, সর্দি-কাশি ও হজমের সমস্যায় কার্যকর।</li>
                            <li>মন ও শরীরকে সতেজ রাখে – মানসিক চাপ কমায়।</li>
                        </ul>
                        <p className="font-semibold text-yellow-800">
                            👉 সংক্ষেপে, মিশ্র ফুলের মধু হলো নানা ফুলের সমন্বয়ে তৈরি একটি প্রাকৃতিক স্বাস্থ্যকর
                            খাদ্য যা প্রতিদিনের পুষ্টির জন্য এক অসাধারণ সমাধান।
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="md:w-1/2">
                        <Image
                            src='/category/img7.jpg'
                            alt="বরই ফুলের মধু"
                            className="rounded-2xl shadow-lg"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl font-bold mb-4 text-yellow-900">বরই ফুলের মধু</h2>
                        <p className="mb-4">
                            বরই ফুলের মধু গ্রামবাংলার অন্যতম জনপ্রিয় প্রাকৃতিক মধু।
                            মৌসুমে বরই ফুল থেকে সংগৃহীত এ মধুতে থাকে এক অনন্য স্বাদ ও ঘ্রাণ।
                            এটি শুধু সুস্বাদুই নয়, স্বাস্থ্য রক্ষায়ও অত্যন্ত কার্যকর।
                        </p>
                        <ul className="list-disc list-outside px-3 space-y-2 mb-4">
                            <li>হজমশক্তি উন্নত করে এবং গ্যাস্ট্রিক কমায়।</li>
                            <li>সর্দি-কাশি ও গলা ব্যথায় উপকারী।</li>
                            <li>শরীরকে ঠান্ডা রাখে ও রোগ প্রতিরোধ ক্ষমতা বাড়ায়।</li>
                            <li>শক্তি জোগায় এবং ক্লান্তি দূর করে।</li>
                            <li>ত্বক ও রক্ত পরিষ্কার রাখতে সাহায্য করে।</li>
                        </ul>
                        <p className="font-semibold text-yellow-800">
                            👉 সংক্ষেপে, বরই ফুলের মধু হলো প্রকৃতির এক অমূল্য সম্পদ যা শরীর ও
                            মনের সুস্থতার জন্য দারুণ উপকারী।
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
