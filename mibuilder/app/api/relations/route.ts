import { NextRequest, NextResponse } from 'next/server'
import { createRelation, getRelationsByBoard, getRelationsByWorkspace } from '@/lib/supabaseService'

export const dynamic = 'force-dynamic'

// GET all relations for a workspace or board
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const workspaceId = searchParams.get('workspaceId')
    const boardId = searchParams.get('boardId')

    if (workspaceId) {
      const relations = await getRelationsByWorkspace(workspaceId)
      return NextResponse.json(relations)
    } else if (boardId) {
      const relations = await getRelationsByBoard(boardId)
      return NextResponse.json(relations)
    } else {
      return NextResponse.json({ error: 'Missing workspaceId or boardId parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error fetching relations:', error)
    return NextResponse.json({ error: 'Failed to fetch relations' }, { status: 500 })
  }
}

// POST create a new relation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, sourceBoardId, sourceColumnId, targetBoardId, targetColumnId, relationType, workspaceId, settings } = body

    if (!name || !sourceBoardId || !sourceColumnId || !targetBoardId || !targetColumnId || !workspaceId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const relation = await createRelation({
      name,
      sourceBoardId,
      sourceColumnId,
      targetBoardId,
      targetColumnId,
      relationType,
      workspaceId,
      settings,
    })

    return NextResponse.json(relation, { status: 201 })
  } catch (error) {
    console.error('Error creating relation:', error)
    return NextResponse.json({ error: 'Failed to create relation' }, { status: 500 })
  }
}
