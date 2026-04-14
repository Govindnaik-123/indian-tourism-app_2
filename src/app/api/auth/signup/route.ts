import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/crypto';
import { signToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    const { name, email, password } = await request.json();

    // 1. Server-side Validation
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: 'All fields are required',
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

    if (password.length < 6) {
      return NextResponse.json({
        success: false,
        message: 'Password must be at least 6 characters long',
        data: null
      }, { status: 400 });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'An account with this email already exists',
        data: null
      }, { status: 409 });
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // 5. Generate JWT token
    const token = await signToken({
      userId: savedUser._id.toString(),
      email: savedUser.email,
    });

    // 6. Create response with user data (excluding password)
    const userResponse = {
      id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    };

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: userResponse,
        token: token
      }
    }, { status: 201 });

    // 7. Set HttpOnly cookie for security
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

  } catch (error: any) {
    console.error('Signup API error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    // Handle MongoDB duplicate key error
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json({
        success: false,
        message: 'An account with this email already exists',
        data: null
      }, { status: 409 });
    }

    return NextResponse.json({
      success: false,
      message: 'Internal server error. Please try again later.',
      data: null
    }, { status: 500 });
  }
}
