import { NextRequest, NextResponse } from 'next/server'
import { Workspace } from '@/models/Workspace'
import { connectDB } from '@/lib/db'
import jwt from 'jsonwebtoken'

// Middleware to verify JWT token
async function verifyToken(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any
    return decoded
  } catch (error) {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all workspaces where user is owner or member
    const workspaces = await Workspace.find({
      $or: [
        { owner: user.userId },
        { members: user.userId }
      ]
    }).populate('owner', 'name email')

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
    await connectDB()
    
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description } = body

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Workspace name is required' },
        { status: 400 }
      )
    }

    // Create new workspace
    const workspace = new Workspace({
      name,
      description: description || '',
      owner: user.userId,
      members: [user.userId],
      projects: [],
      avatar: name.substring(0, 2).toUpperCase()
    })

    await workspace.save()

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
