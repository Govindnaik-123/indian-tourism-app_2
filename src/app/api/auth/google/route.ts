import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';
import { hashPassword } from '@/lib/crypto';

export async function POST(request: NextRequest) {
  try {
    const { credential, rememberMe = false } = await request.json();

    // 1. Initialize the Google OAuth client safely inside the request handler
    const googleClient = new OAuth2Client(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    );

    // 1. Validate input
    if (!credential) {
      return NextResponse.json({
        success: false,
        message: 'Google credential is required',
        data: null
      }, { status: 400 });
    }

    // Check if Google OAuth is configured
    if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json({
        success: false,
        message: 'Google authentication is not configured on the server',
        data: null
      }, { status: 503 });
    }

    // 2. Verify the Google ID Token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({
        success: false,
        message: 'Invalid Google authentication token',
        data: null
      }, { status: 401 });
    }

    const { email, name, picture, sub: googleId, email_verified } = payload;

    // 3. Validate email verification
    if (!email_verified) {
      return NextResponse.json({
        success: false,
        message: 'Please verify your Google account email first',
        data: null
      }, { status: 401 });
    }

    // 4. Connect to database
    await connectDB();

    // 5. Find or create user
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create new user for Google OAuth
      // Generate a secure random password for the user (they won't use it for login)
      const randomPassword = await hashPassword(Math.random().toString(36) + Date.now().toString());

      user = new User({
        name: name || email.split('@')[0],
        email: email.toLowerCase(),
        password: randomPassword, // Securely hashed random password
        googleId: googleId, // Store Google ID for future reference
        // Could add avatar: picture if we extend the schema
      });

      await user.save();
    } else {
      // Update Google ID if not set (for existing users)
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    }

    // 6. Generate JWT token
    const tokenExpiry = rememberMe ? '30d' : '7d';
    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
    }, tokenExpiry);

    // 7. Create user response
    const userResponse = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      preferredMood: user.preferredMood,
      preferredSeason: user.preferredSeason,
      preferredBudget: user.preferredBudget,
      preferredTravelType: user.preferredTravelType,
      preferredLandscape: user.preferredLandscape,
      createdAt: user.createdAt,
    };

    // 8. Create response
    const response = NextResponse.json({
      success: true,
      message: 'Google authentication successful',
      data: {
        user: userResponse,
        token: token
      }
    }, { status: 200 });

    // 9. Set HttpOnly cookie
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60;

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: maxAge,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Google authentication error:', error);

    // Handle specific Google OAuth errors
    if (error instanceof Error && error.message?.includes('Wrong number of segments')) {
      return NextResponse.json({
        success: false,
        message: 'Invalid Google authentication token',
        data: null
      }, { status: 401 });
    }

    return NextResponse.json({
      success: false,
      message: 'Google authentication failed. Please try again.',
      data: null
    }, { status: 500 });
  }
}

