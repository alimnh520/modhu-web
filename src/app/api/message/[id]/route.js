// app/api/message/[id]/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";

export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        const collection = await getCollection("messages");

        const message = await collection.findOne({ _id: new ObjectId(id) });
        if (!message) {
            return NextResponse.json(
                { success: false, message: "❌ বার্তা পাওয়া যায়নি" },
                { status: 404 }
            );
        }

        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({
            success: true,
            message: "✅ বার্তা সফলভাবে মুছে ফেলা হয়েছে",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "❌ সার্ভার এরর" },
            { status: 500 }
        );
    }
}
