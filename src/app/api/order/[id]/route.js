// app/api/order/[id]/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const { status } = await request.json();

        const collection = await getCollection("orders");

        const order = await collection.findOne({ _id: new ObjectId(id) });
        if (!order) {
            return NextResponse.json(
                { success: false, message: "❌ অর্ডার পাওয়া যায়নি" },
                { status: 404 }
            );
        }

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status } }
        );

        return NextResponse.json({
            success: true,
            message: "✅ অর্ডারের স্ট্যাটাস সফলভাবে আপডেট হয়েছে",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "❌ সার্ভার এরর" },
            { status: 500 }
        );
    }
}
