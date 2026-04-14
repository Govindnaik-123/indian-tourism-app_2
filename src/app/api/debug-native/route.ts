import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(request: NextRequest) {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) return NextResponse.json({ error: 'No URI' }, { status: 500 });

  const client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();
    const { email } = await request.json();
    const user = await db.collection('users').findOne({ email: email.toLowerCase().trim() });
    
    return NextResponse.json({
      success: true,
      found: !!user,
      email: user?.email
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await client.close();
  }
}
