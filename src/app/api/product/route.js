import cloudinary from "@/cloudinary/cloudConfig";
import { UploadImage } from "@/cloudinary/cloudUpload";
import { getCollection } from "@/lib/mongoClient";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const name = formData.get('name');
        const price = Number(formData.get('price'));
        const dec = formData.get('dec');
        const img = formData.get('img');

        const imageResult = await UploadImage(img);

        const collection = await getCollection("products");

        const newProduct = {
            name,
            price,
            dec,
            discount: null,
            img: imageResult.secure_url,
            url: imageResult.public_id
        };

        await collection.insertOne(newProduct);

        return NextResponse.json({ message: 'success', success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}

export async function GET() {
    try {
        const collection = await getCollection("products");
        const data = await collection.find({}).toArray();
        return NextResponse.json({ message: data, success: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}


export async function DELETE(request) {
    try {

        const { id, url } = await request.json();

        if (url) {
            await cloudinary.uploader.destroy(url, { resource_type: "image" });
        }

        const collection = await getCollection("products");
        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ success: true, message: "🗑️ পণ্য ডিলেট হয়েছে!" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "❌ সার্ভার এরর" });
    }
}
