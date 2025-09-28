// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongoClient";

export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const collection = await getCollection("products");
        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return NextResponse.json(
                { success: false, message: "❌ পণ্য পাওয়া যায়নি" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, product });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "❌ সার্ভার এরর" },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { price } = await request.json();

        const collection = await getCollection("products");
        const product = await collection.findOne({ _id: new ObjectId(id) });

        if (!product) {
            return NextResponse.json(
                { success: false, message: "❌ পণ্য পাওয়া যায়নি" },
                { status: 404 }
            );
        }

        const newData = {
            price,
            discount: product.price > price ? product.price : null,
        };

        await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: newData }
        );

        return NextResponse.json({
            success: true,
            message: "✅ দাম সফলভাবে আপডেট হয়েছে",
        });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "❌ সার্ভার এরর" },
            { status: 500 }
        );
    }
}

