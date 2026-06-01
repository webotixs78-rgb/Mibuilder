import { NextRequest, NextResponse } from 'next/server'
import { deleteBoard, getBoardById, removeBoardFromWorkspace, updateBoard } from '@/lib/supabaseService'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const board = await getBoardById(params.id)

    if (!board) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: board
    })
  } catch (error) {
    console.error('Error fetching board:', error)
    return NextResponse.json(
      { error: 'Failed to fetch board' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, description, icon, color, settings } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (icon !== undefined) updateData.icon = icon
    if (color !== undefined) updateData.color = color
    if (settings !== undefined) updateData.settings = settings

    const board = await updateBoard(params.id, updateData)

    if (!board) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: board
    })
  } catch (error) {
    console.error('Error updating board:', error)
    return NextResponse.json(
      { error: 'Failed to update board' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const board = await getBoardById(params.id)

    if (!board) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      )
    }

    await removeBoardFromWorkspace(board.workspaceId, params.id)
    await deleteBoard(params.id)

    return NextResponse.json({
      success: true,
      message: 'Board deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting board:', error)
    return NextResponse.json(
      { error: 'Failed to delete board' },
      { status: 500 }
    )
  }
}
