import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const authUser = (request as any).user;
    const body = await request.json();
    const { destination, entry, rating, visitDate } = body;

    // Validate input
    if (!destination || !rating) {
      return NextResponse.json({
        success: false,
        message: 'Destination and rating are required'
      }, { status: 400 });
    }

    await connectDB();
    
    const user = await User.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Initialize travelJournal if it doesn't exist
    if (!user.travelJournal) {
      user.travelJournal = [];
    }

    // Add new entry
    user.travelJournal.push({
      destination,
      entry,
      rating: Number(rating),
      visitDate: visitDate || new Date(),
    });

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Journal entry added successfully',
      data: {
        travelJournal: user.travelJournal
      }
    });

  } catch (error: any) {
    console.error('Journal API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}
