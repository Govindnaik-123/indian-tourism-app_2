import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export interface JWTPayload {
  userId: string;
  email: string;
}

export async function signToken(payload: JWTPayload, expiresIn: string = '7d'): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as any);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function getCookieToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const token = await getCookieToken();
    if (!token) return null;
    return await verifyToken(token);
  } catch (error) {
    return null;
  }
}

export function setAuthCookie(token: string): void {
  // This is handled in API routes
}
