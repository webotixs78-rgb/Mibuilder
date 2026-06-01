import { NextRequest, NextResponse } from 'next/server'
import { setActiveBoard } from '@/lib/supabaseService'

// POST set board as active
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { workspaceId } = body

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'Workspace ID is required' },
        { status: 400 }
      )
    }

    const success = await setActiveBoard(workspaceId, params.id)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to set active board' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Board set as active successfully'
    })
  } catch (error) {
    console.error('Error setting active board:', error)
    return NextResponse.json(
      { error: 'Failed to set active board' },
      { status: 500 }
    )
  }
}
