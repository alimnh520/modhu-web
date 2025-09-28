'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaBoxOpen,
    FaShoppingCart,
    FaEnvelope,
    FaKey,
    FaBullhorn,
    FaBars,
    FaTimes,
    FaEdit,
    FaTrashAlt,
    FaCheck,
    FaTimesCircle,
    FaPlus,
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [active, setActive] = useState('products'); // products | orders | messages | password | notices

    // data
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [notices, setNotices] = useState([]);

    // UI states / modals
    const [editModal, setEditModal] = useState(null); // product object
    const [orderModal, setOrderModal] = useState(null); // order object
    const [msgModal, setMsgModal] = useState(null); // message object
    const [loadingIds, setLoadingIds] = useState({}); // {id: boolean}
    const [newNotice, setNewNotice] = useState('');
    const [pwd, setPwd] = useState({ newPass: '', confirmPass: '' });
    const [newProduct, setNewProduct] = useState({ name: '', price: '', dec: '', img: null });
    const [addModal, setAddModal] = useState(false);
    const [preview, setPreview] = useState(null);



    useEffect(() => {
        document.title = "স্বর্ণমধু || ড্যাসবোর্ড";
    }, []);

    // fetch initial data
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [pRes, oRes, mRes, nRes] = await Promise.all([
                    fetch('/api/product'),
                    fetch('/api/order'),
                    fetch('/api/message'),
                    fetch('/api/notice'),
                ]);

                const [pData, oData, mData, nData] = await Promise.all([
                    pRes.json().catch(() => ({})),
                    oRes.json().catch(() => ({})),
                    mRes.json().catch(() => ({})),
                    nRes.json().catch(() => ({})),
                ]);

                if (pData?.success) setProducts(pData.message || []);
                if (oData?.success) setOrders(oData.message || []);
                if (mData?.success) setMessages(mData.message || []);
                if (nData?.success) setNotices(nData.message || []);
            } catch (err) {
                console.error(err);
                toast.error('ডেটা লোডে সমস্যা হয়েছে।');
            }
        };

        fetchAll();
    }, []);

    /* ------------------ Handlers ------------------ */

    // 1) Edit price: open modal, update

    const openEdit = (product) => setEditModal({ ...product });

    const saveEdit = async () => {
        if (!editModal) return;
        const id = editModal._id;
        setLoadingIds((s) => ({ ...s, [id]: true }));
        try {
            const res = await fetch(`/api/product/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price: Number(editModal.price) }),
            });
            const data = await res.json();
            if (data.success) {
                setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, price: editModal.price } : p)));
                toast.success('মূল্য সফলভাবে আপডেট হয়েছে');
                setEditModal(null);
            } else {
                toast.error(data.message || 'আপডেট ব্যর্থ');
            }
        } catch (err) {
            console.error(err);
            toast.error('আপডেটে সমস্যা হয়েছে');
        } finally {
            setLoadingIds((s) => ({ ...s, [id]: false }));
        }
    };


    // 2) Order modal view + confirm/cancel. Confirm/Cancel send PUT with status
    const openOrder = (o) => setOrderModal(o);

    const updateOrderStatus = async (orderId, status) => {
        setLoadingIds((s) => ({ ...s, [orderId]: true }));
        try {
            const res = await fetch(`/api/order/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                setOrders((prev) => prev.map((od) => (od._id === orderId ? { ...od, status } : od)));
                toast.success(`অর্ডার ${status} হয়েছে`);
                setOrderModal(null);
            } else {
                toast.error(data.message || 'অপডেট ব্যর্থ');
            }
        } catch (err) {
            console.error(err);
            toast.error('অপডেটে সমস্যা হয়েছে');
        } finally {
            setLoadingIds((s) => ({ ...s, [orderId]: false }));
        }
    };

    // 3) Delete message
    const deleteMessage = async (id) => {
        if (!confirm('আপনি কি নিশ্চিত মুছে ফেলতে চান?')) return;
        setLoadingIds((s) => ({ ...s, [id]: true }));
        try {
            const res = await fetch(`/api/message/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setMessages((prev) => prev.filter((m) => m._id !== id));
                toast.success('বার্তা মুছানো হয়েছে');
            } else toast.error(data.message || 'মুছাতে সমস্যা হয়েছে');
        } catch (err) {
            console.error(err);
            toast.error('সার্ভার এ সমস্যা হয়েছে');
        } finally {
            setLoadingIds((s) => ({ ...s, [id]: false }));
        }
    };

    // 4) change password
    const changePassword = async (e) => {
        e.preventDefault();
        if (!pwd.newPass || !pwd.confirmPass) return toast.error('সব ফিল্ড পূরণ করুন');
        if (pwd.newPass !== pwd.confirmPass) return toast.error('পাসওয়ার্ড মিলছে না');
        try {
            const res = await fetch('/api/admin/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: pwd.newPass }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success('পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে');
                setPwd({ newPass: '', confirmPass: '' });
            } else toast.error(data.message || 'পরিবর্তনে সমস্যা');
        } catch (err) {
            console.error(err);
            toast.error('সার্ভার সমস্যা');
        }
    };

    // 5) add notice
    const addNotice = async () => {
        if (!newNotice.trim()) return toast.error('নোটিস লিখুন');
        try {
            const res = await fetch('/api/notice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: newNotice }),
            });
            const data = await res.json();
            if (data.success) {
                setNotices({ text: newNotice });
                setNewNotice('');
                toast.success('নোটিস সংযুক্ত হয়েছে');
            } else toast.error(data.message || 'নোটিস যোগ করা যায়নি');
        } catch (err) {
            console.error(err);
            toast.error('সার্ভার সমস্যা');
        }
    };

    // নতুন পণ্য যোগ

    const addProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.dec || !newProduct.img) {
            return toast.error('সব ফিল্ড পূরণ করুন');
        }

        if (newProduct.img.size > 3 * 1024 * 1024) {
            return toast.error('ছবির আকার 3MB এর বেশি হতে পারবে না');
        }

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('dec', newProduct.dec);
        formData.append('img', newProduct.img);

        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setNewProduct({ name: '', price: '', dec: '', img: null });
                toast.success('নতুন পণ্য যোগ হয়েছে');
                window.location.reload();
            } else {
                toast.error(data.message || 'পণ্য যোগ করা যায়নি');
            }
        } catch (err) {
            console.error(err);
            toast.error('সার্ভার সমস্যা');
        }
    };

    const handleDelete = async (id, url) => {

        try {
            const res = await fetch('/api/product', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, url }),
            });
            const data = await res.json();
            if (data.success) {
                toast.success('পণ্য সফলভাবে মুছে ফেলা হয়েছে');
                setNewProduct({ name: '', price: '', dec: '', img: null, url: null, _id: null });
                window.location.reload();
            } else {
                toast.error(data.message || 'পণ্য মুছে ফেলা যায়নি');
            }
        } catch (err) {
            console.error(err);
            toast.error('সার্ভার সমস্যা');
        }
    }


    /* ------------------ Small UI helpers ------------------ */
    const stat = (label, value, subtitle) => (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow border border-amber-100">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm text-amber-600">{label}</div>
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-xs text-amber-500 mt-1">{subtitle}</div>
                </div>
                <div className="text-3xl text-amber-400">🐝</div>
            </div>
        </div>
    );

    /* ------------------ Render ------------------ */
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 text-amber-900">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2.5 sm:gap-4">
                        <button
                            className="md:hidden p-2 rounded-lg bg-amber-200 text-amber-900"
                            onClick={() => setSidebarOpen((s) => !s)}
                        >
                            {sidebarOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <div className="flex items-center sm:gap-3 gap-1.5">
                            <img src="/logo/my-logo.png" alt="logo" className="h-12 w-12 object-contain rounded-md shadow-sm" />
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold">স্বর্ণমধু - এডমিন</h1>
                                <p className="text-[10px] sm:text-sm text-amber-700">ড্যাশবোর্ড • পণ্য ও অর্ডার ম্যানেজমেন্ট</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-3 py-2 sm:text-base text-sm rounded-lg bg-amber-200 text-amber-900 font-medium">Admin</div>
                </div>

                <div className="grid grid-cols-12 gap-6">
                    {/* sidebar */}
                    <aside className={`col-span-12 md:col-span-3 ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white shadow-lg rounded-2xl p-4 space-y-4 border border-amber-100">
                            <nav className="space-y-2">
                                <SidebarItem icon={<FaBoxOpen />} title="পণ্যসমূহ" active={active === 'products'} onClick={() => setActive('products')} badge={products.length} />
                                <SidebarItem icon={<FaShoppingCart />} title="অর্ডার" active={active === 'orders'} onClick={() => setActive('orders')} badge={orders.length} />
                                <SidebarItem icon={<FaEnvelope />} title="বার্তা" active={active === 'messages'} onClick={() => setActive('messages')} badge={messages.length} />
                                <SidebarItem icon={<FaKey />} title="পাসওয়ার্ড" active={active === 'password'} onClick={() => setActive('password')} />
                                <SidebarItem icon={<FaBullhorn />} title="নোটিস" active={active === 'notices'} onClick={() => setActive('notices')} badge={notices.length} />
                            </nav>
                        </motion.div>
                    </aside>

                    {/* main */}
                    <main className="col-span-12 md:col-span-9">
                        <motion.div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {stat('মোট পণ্য', products.length, 'সংরক্ষিত প্রোডাক্ট')}
                                {stat('মোট অর্ডার', orders.length, 'নতুন ও পুরাতন')}
                                {stat('অনপঠিত বার্তা', messages.filter(m => !m.read).length, 'ক্রেতার দেয়া বার্তা')}
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-5 border border-amber-100">

                                {/* PRODUCTS */}
                                {active === 'products' && (
                                    <>
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-semibold">পণ্য তালিকা</h2>
                                            <div className="text-sm text-amber-600">মোট {products.length} পণ্য</div>
                                        </div>

                                        {/* নতুন পণ্য যোগ করার বাটন */}
                                        <div className="mb-4">
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"
                                                onClick={() => setAddModal(true)}
                                            >
                                                <FaPlus /> নতুন পণ্য যোগ করুন
                                            </button>
                                        </div>

                                        {/* Add Product Modal */}
                                        {addModal && (
                                            <Modal onClose={() => setAddModal(false)}>
                                                <div className="space-y-3">
                                                    <h3 className="text-lg font-semibold">নতুন পণ্য যোগ করুন</h3>
                                                    <input
                                                        type="text"
                                                        placeholder="নাম"
                                                        value={newProduct.name}
                                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    <input
                                                        type="number"
                                                        placeholder="মূল্য"
                                                        value={newProduct.price}
                                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    <textarea
                                                        placeholder="বিবরণ"
                                                        value={newProduct.dec}
                                                        onChange={(e) => setNewProduct({ ...newProduct, dec: e.target.value })}
                                                        className="w-full p-2 border rounded"
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            setNewProduct({ ...newProduct, img: file });
                                                            if (file) {
                                                                setPreview(URL.createObjectURL(file)); // preview সেট
                                                            } else {
                                                                setPreview(null);
                                                            }
                                                        }}
                                                        className="w-full"
                                                    />

                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            className="px-4 py-2 rounded border"
                                                            onClick={() => setAddModal(false)}
                                                        >
                                                            বাতিল
                                                        </button>
                                                        <button
                                                            className="px-4 py-2 bg-green-500 text-white rounded"
                                                            onClick={() => {
                                                                addProduct();
                                                                setAddModal(false);
                                                            }}
                                                        >
                                                            যোগ করুন
                                                        </button>
                                                    </div>
                                                    {preview && (
                                                        <div className="h-40 flex items-center justify-center mb-3 relative">
                                                            <img src={preview} alt="Preview" className="max-h-full object-contain" />
                                                        </div>
                                                    )}

                                                </div>
                                            </Modal>
                                        )}

                                        {/* Existing Products */}
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {products.length === 0 && <div className="col-span-full p-6 text-center text-amber-600">কোনো পণ্য পাওয়া যায়নি</div>}
                                            {products.slice().reverse().map((p) => (
                                                <div key={p._id} className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-amber-100 flex flex-col">
                                                    <div className="h-40 flex items-center justify-center mb-3">
                                                        <img src={p.img || '/category/honey.png'} alt={p.name} className="max-h-full object-contain" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                                                        <div className="flex items-center justify-between">
                                                            <div className="text-sm text-amber-700 line-through">৳{p.discount ?? ''}</div>
                                                            <div className="text-2xl font-bold text-amber-800">৳{p.price}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex gap-2">
                                                        <button className="flex-1 px-3 py-2 rounded-lg bg-amber-500 text-white shadow" onClick={() => openEdit(p)}><FaEdit /> <span className="ml-2">Edit</span></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}


                                {/* ORDERS */}
                                {active === 'orders' && (
                                    <>
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-semibold">অর্ডার ম্যানেজমেন্ট</h2>
                                            <div className="text-sm text-amber-600">মোট {orders.length} অর্ডার</div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full table-auto">
                                                <thead>
                                                    <tr className="text-sm text-amber-600 border-b">
                                                        <th className="py-2 text-left">গ্রাহক</th>
                                                        <th className="py-2 text-left">প্রোডাক্ট</th>
                                                        <th className="py-2">পরিমান</th>
                                                        <th className="py-2">টাকা</th>
                                                        <th className="py-2">স্ট্যাটাস</th>
                                                        <th className="py-2">কর্ম</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.slice().reverse().map((o) => (
                                                        <tr key={o._id} className="border-b last:border-0 hover:bg-yellow-50">
                                                            <td className="py-3">{o.name}</td>
                                                            <td className="py-3">{o.productName}</td>
                                                            <td className="py-3 text-center">{o.quantity}</td>
                                                            <td className="py-3 text-center">৳{o.totalPrice ?? o.price * o.quantity}</td>
                                                            <td className="py-3 text-center">
                                                                <span className={`px-2 py-1 rounded text-xs ${o.status === 'pending' ? 'bg-yellow-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{o.status}</span>
                                                            </td>
                                                            <td className="py-3 text-center">
                                                                <button className="px-3 py-1 bg-amber-400 rounded text-white mr-2" onClick={() => openOrder(o)}>দেখুন</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}

                                {/* MESSAGES */}
                                {active === 'messages' && (
                                    <>
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-xl font-semibold">বার্তা</h2>
                                            <div className="text-sm text-amber-600">মোট {messages.length} বার্তা</div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full table-auto">
                                                <thead>
                                                    <tr className="text-sm text-amber-600 border-b">
                                                        <th className="py-2 text-left">নাম</th>
                                                        <th className="py-2 text-left">মোবাইল</th>
                                                        <th className="py-2 text-center">কর্ম</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {messages.slice().reverse().map((m) => (
                                                        <tr key={m._id} className="border-b last:border-0 hover:bg-yellow-50">
                                                            <td className="py-3">{m.name}</td>
                                                            <td className="py-3">{m.mobile}</td>
                                                            <td className="py-3 text-center">
                                                                <button className="px-3 py-1 bg-red-500 text-white rounded mr-2" onClick={() => deleteMessage(m._id)} disabled={loadingIds[m._id]}>
                                                                    {loadingIds[m._id] ? '...' : 'Delete'}
                                                                </button>
                                                                <button className="px-3 py-1 bg-amber-400 rounded text-white" onClick={() => setMsgModal(m)}>দেখুন</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}

                                {/* PASSWORD */}
                                {active === 'password' && (
                                    <div className="max-w-md">
                                        <h2 className="text-lg font-semibold mb-3">পাসওয়ার্ড পরিবর্তন</h2>
                                        <form onSubmit={changePassword} className="space-y-3 bg-yellow-50 p-4 rounded-lg">
                                            <input type="password" placeholder="নতুন পাসওয়ার্ড" className="w-full p-2 border rounded" value={pwd.newPass} onChange={(e) => setPwd({ ...pwd, newPass: e.target.value })} />
                                            <input type="password" placeholder="কনফার্ম নতুন পাসওয়ার্ড" className="w-full p-2 border rounded" value={pwd.confirmPass} onChange={(e) => setPwd({ ...pwd, confirmPass: e.target.value })} />
                                            <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded">Change Password</button>
                                        </form>
                                    </div>
                                )}

                                {/* NOTICES */}
                                {active === 'notices' && (
                                    <div>
                                        <h2 className="text-lg font-semibold mb-3">নোটিস বোর্ড</h2>
                                        <div className="flex gap-2 mb-4">
                                            <input value={newNotice} onChange={(e) => setNewNotice(e.target.value)} placeholder="নতুন নোটিস লিখুন" className="flex-1 p-2 border rounded" />
                                            <button onClick={addNotice} className="px-4 py-2 bg-amber-500 text-white rounded">Add</button>
                                        </div>
                                        <div className="space-y-3 text-amber-600">
                                            <div className="p-3 bg-white rounded shadow border">{notices.text}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </main>
                </div>
            </div>

            {/* Edit Product Modal */}
            {editModal && (
                <Modal onClose={() => setEditModal(null)}>
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">{editModal.name}</h3>
                        <img src={editModal.img} alt={editModal.name} className="h-36 object-contain mx-auto" />
                        <div>
                            <label className="text-sm text-amber-700">মূল্য (৳)</label>
                            <input type="number" value={editModal.price} onChange={(e) => setEditModal({ ...editModal, price: e.target.value })} className="w-full p-2 border rounded mt-1" />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => handleDelete(editModal._id, editModal.url)}
                                className="px-4 py-2 rounded border bg-red-500 text-white "
                            >
                                ডিলেট
                            </button>
                            <button className="px-4 py-2 rounded border" onClick={() => setEditModal(null)}>Cancel</button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={saveEdit} disabled={loadingIds[editModal._id]}>
                                {loadingIds[editModal._id] ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Order Detail Modal */}
            {orderModal && (
                <Modal onClose={() => setOrderModal(null)}>
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">অর্ডার ডিটেইল</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <div><strong>গ্রাহক:</strong> {orderModal.name}</div>
                            <div><strong>মোবাইল:</strong> {orderModal.mobile}</div>
                            <div><strong>ঠিকানা:</strong> {orderModal.address}, {orderModal.upazilla}, {orderModal.district}, {orderModal.division}</div>
                            <div><strong>প্রোডাক্ট:</strong> {orderModal.productName}</div>
                            <div><strong>পরিমান:</strong> {orderModal.quantity}</div>
                            <div><strong>একক মূল্য:</strong> ৳{orderModal.price}</div>
                            <div><strong>মোট মূল্য:</strong> ৳{orderModal.totalPrice ?? (orderModal.price * orderModal.quantity)}</div>
                            <div><strong>ডেলিভারি চার্জ:</strong> ৳{orderModal.charge ?? 120}</div>
                            <div><strong>স্ট্যাটাস:</strong> <span className={`px-2 py-1 rounded ${orderModal.status === 'pending' ? 'bg-yellow-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{orderModal.status}</span></div>
                        </div>

                        {
                            orderModal.status === 'pending' && (
                                <div className="flex gap-2 justify-end mt-3">
                                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => updateOrderStatus(orderModal._id, 'cancelled')}>বাতিল</button>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => updateOrderStatus(orderModal._1d || orderModal._id, 'confirmed')}>Confirm</button>
                                </div>
                            )
                        }

                    </div>
                </Modal>
            )}

            {/* Message Modal */}
            {msgModal && (
                <Modal onClose={() => setMsgModal(null)}>
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold">বার্তার বিস্তারিত</h3>
                        <div className="grid gap-2">
                            <div><strong>নাম:</strong> {msgModal.name}</div>
                            <div><strong>মোবাইল:</strong> {msgModal.mobile}</div>
                            <div><strong>বার্তা:</strong> <p className="mt-1 text-amber-800">{msgModal.message}</p></div>
                            <div><strong>তারিখ:</strong> {msgModal.createdAt ? new Date(msgModal.createdAt).toLocaleString("bn-BD") : 'N/A'}</div>
                        </div>

                        <div className="flex gap-2 justify-end mt-3">
                            <button
                                className="px-4 py-2 rounded border"
                                onClick={() => setMsgModal(null)}
                            >
                                বন্ধ করুন
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => {
                                    deleteMessage(msgModal._id);
                                    setMsgModal(null);
                                }}
                                disabled={loadingIds[msgModal._id]}
                            >
                                {loadingIds[msgModal._id] ? 'মুছানো হচ্ছে...' : 'ডিলিট'}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <ToastContainer position="bottom-right" autoClose={2000} />
        </div>
    );
}

/* ------------------ Sidebar Item ------------------ */
function SidebarItem({ icon, title, active, onClick, badge }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition 
        ${active ? 'bg-amber-500 text-white' : 'hover:bg-amber-100 text-amber-800'}`}
        >
            <span className="flex items-center gap-2">
                {icon} {title}
            </span>
            {badge > 0 && <span className="px-2 py-0.5 bg-amber-200 text-xs rounded-full">{badge}</span>}
        </button>
    );
}

/* ------------------ Modal Component ------------------ */
function Modal({ children, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                >
                    ✕
                </button>
                {children}
            </motion.div>
        </div>
    );
}
