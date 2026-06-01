import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { createWorkspace, getWorkspacesForUser } from '@/lib/supabaseService'

async function verifyToken(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')

  if (!token) {
    return null
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const workspaces = await getWorkspacesForUser(user.userId)

    return NextResponse.json({
      workspaces
    }, { status: 200 })
  } catch (error) {
    console.error('Get workspaces error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Workspace name is required' },
        { status: 400 }
      )
    }

    const workspace = await createWorkspace({
      name,
      description: description || '',
      owner: user.userId,
    })

    return NextResponse.json({
      message: 'Workspace created successfully',
      workspace
    }, { status: 201 })
  } catch (error) {
    console.error('Create workspace error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
