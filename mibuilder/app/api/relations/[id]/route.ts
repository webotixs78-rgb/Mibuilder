import { NextRequest, NextResponse } from 'next/server'
import { deleteRelation, getRelationById, updateRelation } from '@/lib/supabaseService'

// GET single relation by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const relation = await getRelationById(params.id)

    if (!relation) {
      return NextResponse.json({ error: 'Relation not found' }, { status: 404 })
    }

    return NextResponse.json(relation)
  } catch (error) {
    console.error('Error fetching relation:', error)
    return NextResponse.json({ error: 'Failed to fetch relation' }, { status: 500 })
  }
}

// PUT update relation by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, settings, relationType } = body

    const updatedRelation = await updateRelation(params.id, {
      name,
      settings,
      relationType,
    })

    if (!updatedRelation) {
      return NextResponse.json({ error: 'Relation not found' }, { status: 404 })
    }

    return NextResponse.json(updatedRelation)
  } catch (error) {
    console.error('Error updating relation:', error)
    return NextResponse.json({ error: 'Failed to update relation' }, { status: 500 })
  }
}

// DELETE relation by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteRelation(params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting relation:', error)
    return NextResponse.json({ error: 'Failed to delete relation' }, { status: 500 })
  }
}
