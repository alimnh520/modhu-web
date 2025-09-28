
// app/api/order/route.js
import { connectDB } from "@/lib/connectDb";
import { getCollection } from "@/lib/mongoClient";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Message from "@/models/message";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, mobile, message } = body;

        if (!name || !mobile || !message) {
            return NextResponse.json({ success: false, message: "সব তথ্য পূরণ করুন!" }, { status: 400 });
        }

        await connectDB();

        const newMessage = new Message({
            name,
            mobile,
            message
        });

        const savedOrder = await newMessage.save();

        return NextResponse.json({ success: true, message: "বার্তা পাঠানো হয়েছে!", order: savedOrder });
    } catch (err) {
        console.error('err is : ', err);
        return NextResponse.json({ success: false, message: "সার্ভারে সমস্যা হয়েছে!" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const collection = await getCollection("messages");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}