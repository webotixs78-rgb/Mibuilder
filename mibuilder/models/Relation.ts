import mongoose, { Schema, Document } from 'mongoose'

export interface IRelation extends Document {
  name: string
  sourceBoardId: string
  sourceColumnId: string
  targetBoardId: string
  targetColumnId: string
  relationType: 'one-to-one' | 'one-to-many' | 'many-to-many'
  workspaceId: string
  settings: {
    allowMultiple: boolean
    required: boolean
    showInTable: boolean
    displayField: string
  }
  createdAt: Date
  updatedAt: Date
}

const relationSchema = new Schema<IRelation>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sourceBoardId: {
    type: String,
    required: true,
    ref: 'Board',
  },
  sourceColumnId: {
    type: String,
    required: true,
  },
  targetBoardId: {
    type: String,
    required: true,
    ref: 'Board',
  },
  targetColumnId: {
    type: String,
    required: true,
  },
  relationType: {
    type: String,
    enum: ['one-to-one', 'one-to-many', 'many-to-many'],
    default: 'one-to-many',
  },
  workspaceId: {
    type: String,
    required: true,
    ref: 'Workspace',
  },
  settings: {
    allowMultiple: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    showInTable: {
      type: Boolean,
      default: true,
    },
    displayField: {
      type: String,
      default: 'name',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps: true,
})

export const Relation = mongoose.models.Relation || mongoose.model('Relation', relationSchema)

export class RelationModel {
  static async create(relationData: Omit<IRelation, '_id' | 'createdAt' | 'updatedAt'>): Promise<IRelation> {
    const newRelation = new Relation(relationData);
    return await newRelation.save();
  }

  static async findById(id: string): Promise<IRelation | null> {
    return Relation.findById(id);
  }

  static async findByWorkspace(workspaceId: string): Promise<IRelation[]> {
    return Relation.find({ workspaceId });
  }

  static async findByBoard(boardId: string): Promise<IRelation[]> {
    return Relation.find({
      $or: [
        { sourceBoardId: boardId },
        { targetBoardId: boardId },
      ],
    });
  }

  static async update(id: string, relationData: Partial<IRelation>): Promise<IRelation | null> {
    return Relation.findByIdAndUpdate(id, relationData, { new: true });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await Relation.findByIdAndDelete(id);
    return result !== null;
  }

  static async findBySourceColumn(boardId: string, columnId: string): Promise<IRelation | null> {
    return Relation.findOne({
      sourceBoardId: boardId,
      sourceColumnId: columnId,
    });
  }

  static async getConnectedRecords(
    relationId: string,
    sourceRowId: string
  ): Promise<any[]> {
    const relation = await Relation.findById(relationId);
    if (!relation) return [];

    // This would query the target board's rows based on the relation
    // For now, return empty array - implementation depends on how we store row connections
    return [];
  }
}
