'use client'
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function OrderPage() {

    useEffect(() => {
        document.title = "স্বর্ণমধু || অর্ডার";
    }, []);

    const { id } = useParams();
    const [ordered, setOrdered] = useState(false);

    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const [divisionList, setDivisionList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [upazillaList, setUpazillaList] = useState([]);

    // States for selected names (Name will be sent to backend)
    const [selectedDivision, setSelectedDivision] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazilla, setSelectedUpazilla] = useState('');

    // 🐝 Product fetch
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`/api/product/${id}`);
                const data = await res.json();
                if (data.success) setProduct(data.product);
            } catch (err) {
                console.log(err);
            }
        }
        getProduct();
    }, [id]);

    // 🏙️ Location Data
    useEffect(() => {
        async function fetchData() {
            try {
                const [divRes, disRes, upzRes] = await Promise.all([
                    fetch(process.env.NEXT_PUBLIC_DIVISION),
                    fetch(process.env.NEXT_PUBLIC_DISTRICT),
                    fetch(process.env.NEXT_PUBLIC_UPAZILLA),
                ]);
                const divData = await divRes.json();
                const disData = await disRes.json();
                const upzData = await upzRes.json();

                setDivisionList(Array.isArray(divData) ? divData : divData.data || []);
                setDistrictList(Array.isArray(disData) ? disData : disData.data || []);
                setUpazillaList(Array.isArray(upzData) ? upzData : upzData.data || []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    const handleQuantity = (type) => {
        if (!product) return;
        if (type === 'inc') setQuantity(prev => prev + 1);
        if (type === 'dec' && quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleOrder = async () => {
        if (!name || !mobile || !selectedDivision || !selectedDistrict || !selectedUpazilla || !address) {
            toast.error('সব তথ্য পূরণ করুন!', { position: "bottom-right" });
            return;
        }
        setLoading(true);

        const order = {
            productId: product._id,
            quantity,
            name,
            mobile,
            division: selectedDivision,
            district: selectedDistrict,
            upazilla: selectedUpazilla,
            address,
            date: new Date().toISOString()
        };

        try {
            const res = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message, { position: "bottom-right" });
                setName('');
                setMobile('');
                setQuantity(1);
                setSelectedDivision('');
                setSelectedDistrict('');
                setSelectedUpazilla('');
                setAddress('');
                setOrdered(true);
            }

        } catch (err) {
            console.error(err);
            toast.error("কিছু সমস্যা হয়েছে!", { position: "bottom-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-4 sm:py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yellow-50 to-yellow-100">
            <motion.h1
                className="text-3xl sm:text-4xl font-extrabold text-amber-700 mb-5 sm:mb-8 text-center drop-shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                অর্ডার ফর্ম
            </motion.h1>

            <motion.div
                className="bg-yellow-50 shadow-2xl rounded-3xl p-6 sm:p-10 space-y-6 border border-yellow-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* Product Preview */}
                {product ? (
                    <div className="flex flex-col md:flex-row gap-3 sm:gap-6 items-start sm:items-center">
                        <img src={product.img} alt={product.name} className="w-full md:w-1/2 h-56 object-contain rounded-xl shadow-lg border border-yellow-300" />
                        <div className="flex-1 flex flex-col gap-1.5 sm:gap-3">
                            <h2 className="text-2xl font-semibold text-amber-800">{product.name}</h2>
                            <p className="text-gray-400 line-through">৳{product.discount}</p>
                            <p className="text-2xl font-bold text-amber-700">৳{product.price}</p>

                            {/* Quantity */}
                            <div className="flex items-center gap-4 mt-3">
                                <button onClick={() => handleQuantity('dec')} className="px-3 py-1 bg-amber-200 rounded hover:bg-amber-300 text-amber-900 font-bold">-</button>
                                <span className="text-lg font-semibold text-amber-900">{quantity}</span>
                                <button onClick={() => handleQuantity('inc')} className="px-3 py-1 bg-amber-200 rounded hover:bg-amber-300 text-amber-900 font-bold">+</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                )}

                {/* Form */}
                <div className="grid gap-4">
                    <input type="text" placeholder="নাম" value={name} onChange={e => setName(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border-yellow-600 focus:ring-amber-400 bg-yellow-50" />
                    <input type="text" placeholder="মোবাইল" value={mobile} onChange={e => setMobile(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border-yellow-600 focus:ring-amber-400 bg-yellow-50" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Division */}
                        <div className="flex flex-col items-start w-full border border-yellow-600 relative py-4 rounded-md h-14">
                            <div className="absolute right-4 text-xl text-yellow-600 flex items-center justify-center space-x-2 top-1/2 -translate-y-1/2">
                                <div className="w-0.5 h-6 bg-yellow-600"></div>
                                <MdOutlineArrowDropDownCircle />
                            </div>
                            <p className="absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-yellow-50 text-amber-700 font-semibold">
                                বিভাগ <span className="text-red-500 relative top-1 text-lg">*</span>
                            </p>
                            <select
                                className="bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none"
                                value={selectedDivision}
                                onChange={(e) => {
                                    setSelectedDivision(e.target.value);
                                    setSelectedDistrict('');
                                    setSelectedUpazilla('');
                                }}
                            >
                                <option value="" disabled>বিভাগ নির্বাচন করুন</option>
                                {divisionList?.slice().reverse().map((d) => (
                                    <option key={d.BBS_CODE} value={d.NAME}>{d.NAME}</option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div className="flex flex-col items-start w-full border border-yellow-600 relative py-4 rounded-md h-14">
                            <div className="absolute right-4 text-xl text-yellow-600 flex items-center justify-center space-x-2 top-1/2 -translate-y-1/2">
                                <div className="w-0.5 h-6 bg-yellow-600"></div>
                                <MdOutlineArrowDropDownCircle />
                            </div>
                            <p className="absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-yellow-50 text-amber-700 font-semibold">
                                জেলা <span className="text-red-500 relative top-1 text-lg">*</span>
                            </p>
                            <select
                                className="bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none"
                                value={selectedDistrict}
                                onChange={(e) => {
                                    setSelectedDistrict(e.target.value);
                                    setSelectedUpazilla('');
                                }}
                                disabled={!selectedDivision}
                            >
                                <option value="" disabled>জেলা নির্বাচন করুন</option>
                                {districtList?.filter(d => d.DIVISION_BBS_CODE.toString() === divisionList.find(div => div.NAME === selectedDivision)?.BBS_CODE.toString()).slice().reverse().map((d) => (
                                    <option key={d.BBS_CODE} value={d.NAME}>{d.NAME}</option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div className="flex flex-col items-start w-full border border-yellow-600 relative py-4 rounded-md h-14">
                            <div className="absolute right-4 text-xl text-yellow-600 flex items-center justify-center space-x-2 top-1/2 -translate-y-1/2">
                                <div className="w-0.5 h-6 bg-yellow-600"></div>
                                <MdOutlineArrowDropDownCircle />
                            </div>
                            <p className="absolute -top-3 rounded-md left-3 text-sm backdrop-blur-md px-2 bg-yellow-50 text-amber-700 font-semibold">
                                উপজেলা <span className="text-red-500 relative top-1 text-lg">*</span>
                            </p>
                            <select
                                className="bg-transparent w-full relative px-4 appearance-none cursor-pointer text-neutral-600 outline-none"
                                value={selectedUpazilla}
                                onChange={(e) => setSelectedUpazilla(e.target.value)}
                                disabled={!selectedDistrict}
                            >
                                <option value="" disabled>উপজেলা নির্বাচন করুন</option>
                                {upazillaList?.filter(u => u.DISTRICT_BBS_CODE.toString() === districtList.find(dis => dis.NAME === selectedDistrict)?.BBS_CODE.toString()).slice().reverse().map((u) => (
                                    <option key={u.BBS_CODE} value={u.NAME}>{u.NAME}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <textarea placeholder="বিস্তারিত ঠিকানা" value={address} onChange={e => setAddress(e.target.value)} className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 border-yellow-600 focus:ring-amber-400 bg-yellow-50" rows={3} />
                </div>

                {/* Delivery Charge Info */}
                <p className="text-yellow-800 font-medium text-sm sm:text-base mt-2 mb-4">
                    🚚 সারা বাংলাদেশে ক্যাশ অন ডেলিভারি: ১২০ টাকা
                </p>

                {/* Order Button */}
                {!ordered && (
                    <motion.button
                        onClick={handleOrder}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold text-lg shadow-lg shadow-amber-300"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {loading ? "লোড হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
                    </motion.button>
                )}

            </motion.div>

            <ToastContainer />
        </div>
    );
}
