import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/supabaseService'
import { generateToken, setTokenCookie } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, company } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    const user = await createUser({
      email,
      password,
      name,
      company: company || '',
      provider: 'local',
      role: 'owner'
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider
    })

    const response = NextResponse.json({
      message: 'User created successfully',
      user
    }, { status: 201 })

    setTokenCookie(token, response)

    return response
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
