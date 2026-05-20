import { NextRequest, NextResponse } from 'next/server'
import { BoardModel, Board } from '@/models/Board'
import { WorkspaceModel } from '@/models/Workspace'
import connectDB from '@/lib/database'

// GET all boards for a workspace
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const workspaceId = searchParams.get('workspaceId')
    
    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      )
    }
    
    const boards = await BoardModel.findByWorkspace(workspaceId)
    
    return NextResponse.json({
      success: true,
      data: boards
    })
  } catch (error) {
    console.error('Error fetching boards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch boards' },
      { status: 500 }
    )
  }
}

// POST create a new board
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, description, icon, color, workspaceId, createdBy } = body
    
    if (!name || !workspaceId || !createdBy) {
      return NextResponse.json(
        { error: 'Name, workspaceId, and createdBy are required' },
        { status: 400 }
      )
    }
    
    // Verify workspace exists
    const workspace = await WorkspaceModel.findById(workspaceId)
    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      )
    }
    
    // Get current board count for order
    const existingBoards = await BoardModel.findByWorkspace(workspaceId)
    const order = existingBoards.length
    
    // Create board
    const board = await new Board({
      name,
      description,
      icon: icon || '📋',
      color: color || '#8B5CF6',
      workspaceId,
      columns: [],
      rows: [],
      automations: [],
      relations: [],
      views: [],
      settings: {
        defaultView: 'table',
        autoSave: true,
        pageSize: 50
      },
      order,
      isActive: existingBoards.length === 0, // First board is active
      createdBy
    }).save()
    
    // Add board to workspace
    await WorkspaceModel.addBoard(workspaceId, board._id.toString())
    
    return NextResponse.json({
      success: true,
      data: board
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating board:', error)
    return NextResponse.json(
      { error: 'Failed to create board' },
      { status: 500 }
    )
  }
}
