import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';

export async function GET() {
  const initialState = mongoose.connection.readyState;
  let error = null;
  try {
    await connectDB();
  } catch (e: any) {
    error = e.message;
  }
  
  return NextResponse.json({
    initialState,
    finalState: mongoose.connection.readyState,
    error,
    models: Object.keys(mongoose.models)
  });
}
