import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Destination from '@/models/Destination';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const destinations = await Destination.find({});

    return NextResponse.json({
      success: true,
      message: 'Destinations retrieved successfully',
      data: {
        destinations,
        count: destinations.length,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Get all destinations error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to get destinations',
      data: null
    }, { status: 500 });
  }
}
