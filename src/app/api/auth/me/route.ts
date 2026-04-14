import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth-middleware';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    // Connect to database
    await connectDB();

    // Get user from authenticated request
    const { user: authUser } = request as any;

    // Fetch full user data from database
    const user = await User.findById(authUser.userId).select('-password');

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        data: null
      }, { status: 404 });
    }

    // Return user data
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      preferredMood: user.preferredMood,
      preferredSeason: user.preferredSeason,
      preferredBudget: user.preferredBudget,
      preferredTravelType: user.preferredTravelType,
      preferredLandscape: user.preferredLandscape,
      favoriteDestinations: user.favoriteDestinations,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json({
      success: true,
      message: 'User data retrieved successfully',
      data: {
        user: userResponse
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error. Please try again later.',
      data: null
    }, { status: 500 });
  }
}