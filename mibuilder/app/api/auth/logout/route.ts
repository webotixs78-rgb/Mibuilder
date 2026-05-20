import { NextRequest, NextResponse } from 'next/server'
import { clearTokenCookie } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    // Clear the token cookie
    const response = NextResponse.json({
      message: 'Logout successful'
    })

    clearTokenCookie(response)

    return response

  } catch (error: any) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
