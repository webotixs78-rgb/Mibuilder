import { NextRequest, NextResponse } from 'next/server'
import { addBoardToWorkspace, createBoard, getBoardsByWorkspace, getWorkspaceById } from '@/lib/supabaseService'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const workspaceId = searchParams.get('workspaceId')

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      )
    }

    const boards = await getBoardsByWorkspace(workspaceId)

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, icon, color, workspaceId, createdBy } = body

    if (!name || !workspaceId || !createdBy) {
      return NextResponse.json(
        { error: 'Name, workspaceId, and createdBy are required' },
        { status: 400 }
      )
    }

    const workspace = await getWorkspaceById(workspaceId)
    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      )
    }

    const existingBoards = await getBoardsByWorkspace(workspaceId)
    const order = existingBoards.length

    const board = await createBoard({
      name,
      description,
      icon,
      color,
      workspaceId,
      createdBy,
      order,
      isActive: existingBoards.length === 0,
    })

    await addBoardToWorkspace(workspaceId, board.id)

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
