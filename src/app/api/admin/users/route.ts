import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: Request) {
  try {
    // 1. Verify Password
    const password = request.headers.get('x-admin-password');
    const correctPassword = process.env.ADMIN_PASSWORD || 'Govindnaik@1013';

    if (password !== correctPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Connect to DB
    await connectDB();

    // 3. Fetch users securely (only non-sensitive fields)
    const users = await User.find({})
      .select('name email createdAt lastLogin')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ users, total: users.length });

  } catch (error: any) {
    console.error('Admin API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
