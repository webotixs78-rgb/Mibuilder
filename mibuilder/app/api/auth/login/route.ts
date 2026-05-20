import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/User'
import connectDB from '@/lib/database'
import { generateToken, setTokenCookie } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 401 }
      )
    }

    // Check if user has local provider (not OAuth)
    if (user.provider !== 'local') {
      return NextResponse.json(
        { error: `This account uses ${user.provider} login. Please use the ${user.provider} login button.` },
        { status: 400 }
      )
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Update last login
    await user.updateLastLogin()

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      provider: user.provider
    })

    // Set token in HTTP-only cookie
    const response = NextResponse.json({
      message: 'Login successful',
      user: user.toJSON()
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
