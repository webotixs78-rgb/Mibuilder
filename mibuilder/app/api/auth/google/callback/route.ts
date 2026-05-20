import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/User'
import connectDB from '@/lib/database'
import { generateToken, setTokenCookie } from '@/lib/jwt'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/login?error=${encodeURIComponent(error)}`
      )
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/login?error=authorization_failed`
      )
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/login?error=token_exchange_failed`
      )
    }

    // Get user info from Google
    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    )

    const userData = await userResponse.json()

    if (!userData.email) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/login?error=invalid_user_data`
      )
    }

    // Check if user already exists
    let user = await User.findOne({ email: userData.email })

    if (user) {
      // If user exists but doesn't have Google provider, update it
      if (user.provider !== 'google') {
        user.provider = 'google'
        user.providerId = userData.id
        user.avatar = userData.picture || user.avatar
        await user.save()
      }
    } else {
      // Create new user
      user = new User({
        email: userData.email,
        name: userData.name,
        avatar: userData.picture,
        provider: 'google',
        providerId: userData.id,
        role: 'owner'
      })
      await user.save()
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

    // Set token in HTTP-only cookie and redirect
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/dashboard`
    )

    setTokenCookie(token, response)

    return response

  } catch (error: any) {
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=server_error`
    )
  }
}
