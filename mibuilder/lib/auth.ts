import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './jwt'
import { getUserById } from './supabaseService'

export async function authenticate(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return null
    }
    
    const decoded = verifyToken(token)
    const user = await getUserById(decoded.userId)
    
    if (!user || !user.isActive) {
      return null
    }
    
    return user
  } catch (error) {
    return null
  }
}

export async function requireAuth(request: NextRequest) {
  const user = await authenticate(request)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized - Please login to access this resource' },
      { status: 401 }
    )
  }
  
  return user
}

export function withAuth(handler: any) {
  return async (request: any, context: any) => {
    const user = await authenticate(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login to access this resource' },
        { status: 401 }
      )
    }
    
    request.user = user
    
    return handler(request, context)
  }
}
