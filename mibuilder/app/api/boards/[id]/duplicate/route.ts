import { NextRequest, NextResponse } from 'next/server'
import { addBoardToWorkspace, duplicateBoard } from '@/lib/supabaseService'

// POST duplicate board
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const board = await duplicateBoard(params.id)

    if (!board) {
      return NextResponse.json(
        { error: 'Board not found or duplication failed' },
        { status: 404 }
      )
    }

    await addBoardToWorkspace(board.workspaceId, board.id)

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
