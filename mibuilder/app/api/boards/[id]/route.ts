import { NextRequest, NextResponse } from 'next/server'
import { BoardModel, Board } from '@/models/Board'
import { WorkspaceModel } from '@/models/Workspace'
import connectDB from '@/lib/database'

// GET single board by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const board = await BoardModel.findById(params.id)
    
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

// PUT update board
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, description, icon, color, settings } = body
    
    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (icon !== undefined) updateData.icon = icon
    if (color !== undefined) updateData.color = color
    if (settings !== undefined) updateData.settings = settings
    
    const board = await BoardModel.update(params.id, updateData)
    
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

// DELETE board
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const board = await BoardModel.findById(params.id)
    
    if (!board) {
      return NextResponse.json(
        { error: 'Board not found' },
        { status: 404 }
      )
    }
    
    // Remove board from workspace
    await WorkspaceModel.removeBoard(board.workspaceId, params.id)
    
    // Delete board
    await BoardModel.delete(params.id)
    
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
