// app/api/admin/login/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getCollection } from "@/lib/mongoClient";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "❌ ইমেইল এবং পাসওয়ার্ড প্রয়োজন" },
                { status: 400 }
            );
        }

        const collection = await getCollection("admin");
        const admin = await collection.findOne({ email });

        if (!admin) {
            return NextResponse.json(
                { success: false, message: "❌ ইমেইল বা পাসওয়ার্ড ভুল" },
                { status: 401 }
            );
        }

        // const match = await bcrypt.compare(password, admin.password);

        if (password !== admin.password) {
            return NextResponse.json(
                { success: false, message: "❌ ইমেইল বা পাসওয়ার্ড ভুল" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: admin._id.toString(), email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const response = NextResponse.json({
            success: true,
            message: "✅ লগইন সফল হয়েছে",
        });

        response.cookies.set("modhu-admin", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60, // 1 দিন
            sameSite: "strict",
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { success: false, message: "❌ সার্ভার এরর" },
            { status: 500 }
        );
    }
}
