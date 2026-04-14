import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    console.log('Toggle favorite API hit');
    // 1. Check authentication
    const authError = await requireAuth(request);
    if (authError) {
      console.log('Auth check failed');
      return authError;
    }

    const authUser = (request as any).user;
    console.log('Auth user:', authUser.userId);
    
    const body = await request.json();
    console.log('Request body:', body);
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({
        success: false,
        message: 'Destination slug is required'
      }, { status: 400 });
    }

    try {
      console.log('Connecting to DB...');
      await connectDB();
      console.log('DB Connected');
      
      if (!authUser || !authUser.userId) {
        console.error('Missing auth user ID in request object');
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }

      console.log('Finding user by ID:', authUser.userId);
      const user = await User.findById(authUser.userId);
      if (!user) {
        console.error('User not found in DB for ID:', authUser.userId);
        return NextResponse.json({ success: false, message: 'User not found in database' }, { status: 404 });
      }

      // Ensure favoriteDestinations is an array
      if (!user.favoriteDestinations || !Array.isArray(user.favoriteDestinations)) {
        console.log('Initializing favoriteDestinations array for user');
        user.favoriteDestinations = [];
      }

      console.log('Current favorites:', user.favoriteDestinations);
      console.log('Toggling slug:', slug);

      // Convert all items to strings for comparison
      const currentFavorites = user.favoriteDestinations.map((f: any) => String(f));
      const index = currentFavorites.indexOf(String(slug));
      
      let isFavorite = false;
      if (index === -1) {
        user.favoriteDestinations.push(slug);
        isFavorite = true;
        console.log('Added to favorites');
      } else {
        user.favoriteDestinations.splice(index, 1);
        isFavorite = false;
        console.log('Removed from favorites');
      }

      console.log('Saving user document...');
      await user.save();
      console.log('User saved successfully');

      return NextResponse.json({
        success: true,
        message: isFavorite ? 'Added to favorites' : 'Removed from favorites',
        data: {
          isFavorite,
          favoriteDestinations: user.favoriteDestinations
        }
      });
    } catch (dbError: any) {
      console.error('CRITICAL: Database error in favorite toggle:', dbError.message, dbError.stack);
      return NextResponse.json({
        success: false,
        message: 'Database operation failed',
        error: dbError.message
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('CRITICAL: Toggle favorite internal error:', error.message, error.stack);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, { status: 500 });
  }
}
