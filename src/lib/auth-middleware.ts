import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
  };
}

export async function authenticateRequest(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  user?: { userId: string; email: string };
  error?: string;
}> {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return { isAuthenticated: false, error: 'No authentication token provided' };
    }

    // Verify token
    const decoded = await verifyToken(token);

    if (!decoded) {
      return { isAuthenticated: false, error: 'Invalid or expired token' };
    }

    return {
      isAuthenticated: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
      },
    };
  } catch (error) {
    return { isAuthenticated: false, error: 'Authentication failed' };
  }
}

export async function requireAuth(request: NextRequest): Promise<NextResponse | null> {
  const auth = await authenticateRequest(request);

  if (!auth.isAuthenticated) {
    return NextResponse.json({
      success: false,
      message: auth.error || 'Authentication required',
      data: null
    }, { status: 401 });
  }

  // Add user to request for use in route handlers
  (request as AuthenticatedRequest).user = auth.user!;

  return null; // No error, proceed
}

export async function getCurrentUser(request: NextRequest): Promise<{
  userId: string;
  email: string;
} | null> {
  const auth = await authenticateRequest(request);
  return auth.isAuthenticated ? auth.user! : null;
}