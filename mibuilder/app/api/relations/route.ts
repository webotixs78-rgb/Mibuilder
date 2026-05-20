import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/database"
import { RelationModel } from "@/models/Relation"
import { BoardModel } from "@/models/Board"

// GET all relations for a workspace or board
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const workspaceId = searchParams.get('workspaceId')
    const boardId = searchParams.get('boardId')
    
    if (workspaceId) {
      const relations = await RelationModel.findByWorkspace(workspaceId)
      return NextResponse.json(relations)
    } else if (boardId) {
      const relations = await RelationModel.findByBoard(boardId)
      return NextResponse.json(relations)
    } else {
      return NextResponse.json({ error: "Missing workspaceId or boardId parameter" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error fetching relations:", error)
    return NextResponse.json({ error: "Failed to fetch relations" }, { status: 500 })
  }
}

// POST create a new relation
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { name, sourceBoardId, sourceColumnId, targetBoardId, targetColumnId, relationType, workspaceId, settings } = body
    
    // Validate required fields
    if (!name || !sourceBoardId || !sourceColumnId || !targetBoardId || !targetColumnId || !workspaceId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    // Verify boards exist
    const sourceBoard = await BoardModel.findById(sourceBoardId)
    const targetBoard = await BoardModel.findById(targetBoardId)
    
    if (!sourceBoard || !targetBoard) {
      return NextResponse.json({ error: "Source or target board not found" }, { status: 404 })
    }
    
    // Create relation
    const relationData = {
      name,
      sourceBoardId,
      sourceColumnId,
      targetBoardId,
      targetColumnId,
      relationType: relationType || 'one-to-many',
      workspaceId,
      settings: settings || {
        allowMultiple: false,
        required: false,
        showInTable: true,
        displayField: 'name'
      }
    }
    const relation = await RelationModel.create(relationData as any)
    
    return NextResponse.json(relation, { status: 201 })
  } catch (error) {
    console.error("Error creating relation:", error)
    return NextResponse.json({ error: "Failed to create relation" }, { status: 500 })
  }
}
