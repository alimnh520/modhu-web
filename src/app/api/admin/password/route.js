// app/api/admin/change-password/route.js
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getCollection } from '@/lib/mongoClient';
import { ObjectId } from 'mongodb';

export async function PUT(req) {
    try {
        const body = await req.json();
        const { password } = body || {};

        // hash password
        // const salt = await bcrypt.genSalt(10);
        // const hashed = await bcrypt.hash(newPassword, salt);

        const collection = await getCollection('admin');

        await collection.updateOne(
            { _id: new ObjectId('68d9700875798bfda0446141') },
            { $set: { password } }
        );

        return NextResponse.json({ success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' });

    } catch (err) {
        console.error('Change password error:', err);
        return NextResponse.json({ success: false, message: 'সার্ভার এরর।' }, { status: 500 });
    }
}
