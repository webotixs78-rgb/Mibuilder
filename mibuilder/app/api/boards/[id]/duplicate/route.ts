import { NextRequest, NextResponse } from 'next/server'
import { BoardModel } from '@/models/Board'
import { WorkspaceModel } from '@/models/Workspace'
import connectDB from '@/lib/database'

// POST duplicate board
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const board = await BoardModel.duplicate(params.id)
    
    if (!board) {
      return NextResponse.json(
        { error: 'Board not found or duplication failed' },
        { status: 404 }
      )
    }
    
    // Add duplicated board to workspace
    await WorkspaceModel.addBoard(board.workspaceId, board._id.toString())
    
    return NextResponse.json({
      success: true,
      data: board
    }, { status: 201 })
  } catch (error) {
    console.error('Error duplicating board:', error)
    return NextResponse.json(
      { error: 'Failed to duplicate board' },
      { status: 500 }
    )
  }
}
