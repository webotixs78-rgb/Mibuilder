import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development'

export interface JWTPayload {
  userId: string
  email: string
  name: string
  provider: string
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
}

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' as const : 'lax' as const,
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  }
}

export const setTokenCookie = (token: string, res: NextResponse) => {
  res.cookies.set('token', token, getCookieOptions())
}

export const clearTokenCookie = (res: NextResponse) => {
  res.cookies.set('token', '', {
    ...getCookieOptions(),
    maxAge: 0,
    expires: new Date(0),
  })
}
