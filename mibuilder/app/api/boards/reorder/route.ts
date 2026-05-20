import { NextRequest, NextResponse } from 'next/server'
import { BoardModel } from '@/models/Board'
import connectDB from '@/lib/database'

// POST reorder boards
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { workspaceId, boardIds } = body
    
    if (!workspaceId || !boardIds || !Array.isArray(boardIds)) {
      return NextResponse.json(
        { error: 'Workspace ID and boardIds array are required' },
        { status: 400 }
      )
    }
    
    const success = await BoardModel.reorder(workspaceId, boardIds)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to reorder boards' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Boards reordered successfully'
    })
  } catch (error) {
    console.error('Error reordering boards:', error)
    return NextResponse.json(
      { error: 'Failed to reorder boards' },
      { status: 500 }
    )
  }
}
