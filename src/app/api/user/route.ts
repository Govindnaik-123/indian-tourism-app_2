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

    const user = (request as any).user;

    await connectDB();
    const userData = await User.findById(user.userId).select('-password');

    if (!userData) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        data: null
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'User data retrieved successfully',
      data: {
        user: {
          id: userData._id,
          email: userData.email,
          name: userData.name,
          preferredMood: userData.preferredMood,
          preferredSeason: userData.preferredSeason,
          preferredBudget: userData.preferredBudget,
          preferredTravelType: userData.preferredTravelType,
          preferredLandscape: userData.preferredLandscape,
          darkMode: userData.darkMode,
          favoriteDestinations: userData.favoriteDestinations,
          plannedTrips: userData.plannedTrips,
        },
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get user error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: null
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authError = await requireAuth(request);
    if (authError) {
      return authError;
    }

    const user = (request as any).user;

    await connectDB();
    const updates = await request.json();

    // Sanitize updates - don't allow password changes through this endpoint
    const allowedUpdates = [
      'name',
      'preferredMood',
      'preferredSeason',
      'preferredBudget',
      'preferredTravelType',
      'preferredLandscape',
      'darkMode',
      'plannedTrips',
    ];

    const sanitizedUpdates: any = {};
    Object.keys(updates).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        sanitizedUpdates[key] = updates[key];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      sanitizedUpdates,
      { new: true }
    ).select('-password');

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user: updatedUser,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      data: null
    }, { status: 500 });
  }
}
