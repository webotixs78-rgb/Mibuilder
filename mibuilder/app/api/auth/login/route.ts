import { NextRequest, NextResponse } from 'next/server'
import { getUserRowByEmail, updateUserLastLogin, verifyPassword } from '@/lib/supabaseService'
import { generateToken, setTokenCookie } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await getUserRowByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 401 }
      )
    }

    if (user.provider !== 'local') {
      return NextResponse.json(
        { error: `This account uses ${user.provider} login. Please use the ${user.provider} login button.` },
        { status: 400 }
      )
    }

    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    await updateUserLastLogin(user.id)

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider
    })

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company ?? '',
        role: user.role,
        avatar: user.avatar ?? '',
        isActive: user.is_active,
        provider: user.provider,
        providerId: user.provider_id ?? undefined,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        lastLoginAt: user.last_login_at ?? undefined,
      }
    }, { status: 200 })

    setTokenCookie(token, response)

    return response
  } catch (error: any) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
