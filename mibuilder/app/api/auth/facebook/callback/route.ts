import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail, updateOAuthUser, updateUserLastLogin } from '@/lib/supabaseService'
import { generateToken, setTokenCookie } from '@/lib/jwt'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
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

    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?` +
      `client_id=${process.env.FACEBOOK_APP_ID}&` +
      `client_secret=${process.env.FACEBOOK_APP_SECRET}&` +
      `redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_URL}/api/auth/facebook/callback`)}&` +
      `code=${code}`
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/login?error=token_exchange_failed`
      )
    }

    const userResponse = await fetch(
      `https://graph.facebook.com/v18.0/me?` +
      `fields=id,name,email,picture&` +
      `access_token=${tokenData.access_token}`
    )

    const userData = await userResponse.json()

    if (!userData.email) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/login?error=invalid_user_data`
      )
    }

    let user = await getUserByEmail(userData.email)

    if (user) {
      if (user.provider !== 'facebook') {
        user = await updateOAuthUser(user.id, {
          provider: 'facebook',
          providerId: userData.id,
          avatar: userData.picture?.data?.url || user.avatar,
        })
      }
    } else {
      user = await createUser({
        email: userData.email,
        name: userData.name,
        avatar: userData.picture?.data?.url,
        provider: 'facebook',
        providerId: userData.id,
        role: 'owner',
      })
    }

    if (!user) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}/login?error=user_creation_failed`
      )
    }

    await updateUserLastLogin(user.id)

    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
    })

    const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/dashboard`)
    setTokenCookie(token, response)

    return response
  } catch (error: any) {
    console.error('Facebook OAuth error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/login?error=server_error`
    )
  }
}
