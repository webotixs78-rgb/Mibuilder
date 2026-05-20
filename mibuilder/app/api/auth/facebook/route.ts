import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const appId = process.env.FACEBOOK_APP_ID
  const redirectUri = `${process.env.NEXT_PUBLIC_URL}/api/auth/facebook/callback`

  if (!appId) {
    return NextResponse.json(
      { error: 'Facebook OAuth is not configured' },
      { status: 500 }
    )
  }

  const scope = 'email,public_profile'
  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
    `client_id=${appId}&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `response_type=code&` +
    `scope=${encodeURIComponent(scope)}`

  return NextResponse.redirect(authUrl)
}
