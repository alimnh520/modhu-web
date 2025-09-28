// app/api/notice/route.js
import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongoClient";

export async function POST(request) {
    try {
        const { text } = await request.json();

        const collection = await getCollection("notices");

        // শুধু প্রথম নোটিস আপডেট হবে বা না থাকলে নতুন তৈরি হবে
        await collection.updateOne(
            {},              // প্রথম নোটিস নির্বাচন
            { $set: { text } }, // আপডেট টেক্সট
            { upsert: true }    // যদি না থাকে, নতুন তৈরি হবে
        );

        return NextResponse.json({
            success: true,
            message: "✅ নোটিস সফলভাবে আপডেট হয়েছে",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "❌ সার্ভার এরর" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const collection = await getCollection("notices");
        const notice = await collection.findOne({});
        return NextResponse.json({ message: notice, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}
