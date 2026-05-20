import { NextRequest, NextResponse } from 'next/server'
import { authenticate } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await authenticate(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: user
    })

  } catch (error: any) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
