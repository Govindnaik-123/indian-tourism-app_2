import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { comparePasswords } from '@/lib/crypto';
import { signToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  console.log('Login request received');
  try {
    // Connect to database
    await connectDB();
    console.log('Database connected in login api');

    const { email, password, rememberMe = false } = await request.json();
    console.log(`Login attempt for email: ${email}`);

    // 1. Input validation
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required',
        data: null
      }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address',
        data: null
      }, { status: 400 });
    }

    // 2. Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
        data: null
      }, { status: 401 });
    }

    // 3. Verify password
    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
        data: null
      }, { status: 401 });
    }

    // 4. Generate JWT token
    const tokenExpiry = rememberMe ? '30d' : '7d'; // 30 days if remember me, 7 days otherwise
    const token = await signToken({
      userId: user._id.toString(),
      email: user.email,
    }, tokenExpiry);

    // 5. Create user response (exclude sensitive data)
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

    // 6. Create response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token: token
      }
    }, { status: 200 });

    // 7. Set HttpOnly cookie
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60; // 30 days or 7 days

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: maxAge,
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('Login error:', error.message);
    return NextResponse.json({
      success: false,
      message: 'Internal server error. Please try again later.',
      data: null
    }, { status: 500 });
  }
}
