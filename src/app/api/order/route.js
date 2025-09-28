// app/api/order/route.js
import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import Order from "@/models/orders";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            productId,
            quantity,
            name,
            mobile,
            division,
            district,
            upazilla,
            address,
        } = body;

        if (!productId || !quantity || !name || !mobile || !division || !district || !upazilla || !address) {
            return NextResponse.json({ success: false, message: "সব তথ্য পূরণ করুন!" }, { status: 400 });
        }
        const deliveryFee = 120;

        const collection = await getCollection("products");
        const product = await collection.findOne({ _id: new ObjectId(productId) });

        await connectDB();

        const newOrder = new Order({
            productId: product._id,
            productName: product.name,
            productImage: product.img,
            price: product.price,
            totalPrice: product.price * quantity,
            quantity,
            name,
            mobile,
            division,
            district,
            upazilla,
            address,
            status: "pending",
            charge: deliveryFee,
            date: new Date(),
        });

        const savedOrder = await newOrder.save();

        return NextResponse.json({ success: true, message: "অর্ডার সফলভাবে তৈরি হয়েছে!", order: savedOrder });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "সার্ভারে সমস্যা হয়েছে!" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const collection = await getCollection("orders");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}