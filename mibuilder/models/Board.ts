import mongoose, { Schema, Document } from 'mongoose'

export interface IBoard extends Document {
  name: string
  description?: string
  icon?: string
  color?: string
  workspaceId: string
  columns: any[]
  rows: any[]
  automations: any[]
  relations: any[]
  views: any[]
  settings: {
    defaultView: 'table' | 'kanban' | 'calendar' | 'dashboard'
    autoSave: boolean
    pageSize: number
  }
  order: number
  isActive: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const boardSchema = new Schema<IBoard>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  icon: {
    type: String,
    default: '📋',
  },
  color: {
    type: String,
    default: '#8B5CF6',
  },
  workspaceId: {
    type: String,
    required: true,
    ref: 'Workspace',
  },
  columns: [{
    type: Schema.Types.Mixed,
  }],
  rows: [{
    type: Schema.Types.Mixed,
  }],
  automations: [{
    type: Schema.Types.ObjectId,
    ref: 'Automation',
  }],
  relations: [{
    type: Schema.Types.Mixed,
  }],
  views: [{
    type: Schema.Types.Mixed,
  }],
  settings: {
    defaultView: {
      type: String,
      enum: ['table', 'kanban', 'calendar', 'dashboard'],
      default: 'table',
    },
    autoSave: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 50,
    },
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: String,
    required: true,
    ref: 'User',
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

export const Board = mongoose.models.Board || mongoose.model('Board', boardSchema)

export class BoardModel {
  static async create(boardData: Omit<IBoard, '_id' | 'createdAt' | 'updatedAt'>): Promise<IBoard> {
    const newBoard = new Board(boardData);
    return await newBoard.save();
  }

  static async findById(id: string): Promise<IBoard | null> {
    return Board.findById(id);
  }

  static async findByWorkspace(workspaceId: string): Promise<IBoard[]> {
    return Board.find({ workspaceId }).sort({ order: 1 });
  }

  static async findActiveByWorkspace(workspaceId: string): Promise<IBoard | null> {
    return Board.findOne({ workspaceId, isActive: true });
  }

  static async update(id: string, boardData: Partial<IBoard>): Promise<IBoard | null> {
    return Board.findByIdAndUpdate(id, boardData, { new: true });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await Board.findByIdAndDelete(id);
    return result !== null;
  }

  static async setActive(workspaceId: string, boardId: string): Promise<boolean> {
    await Board.updateMany(
      { workspaceId },
      { isActive: false }
    );
    const result = await Board.findByIdAndUpdate(
      boardId,
      { isActive: true },
      { new: true }
    );
    return result !== null;
  }

  static async reorder(workspaceId: string, boardIds: string[]): Promise<boolean> {
    const updates = boardIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id, workspaceId },
        update: { order: index }
      }
    }));
    
    await Board.bulkWrite(updates);
    return true;
  }

  static async duplicate(boardId: string): Promise<IBoard | null> {
    const originalBoard = await Board.findById(boardId);
    if (!originalBoard) return null;

    const duplicatedBoard = new Board({
      ...originalBoard.toObject(),
      _id: undefined,
      name: `${originalBoard.name} (Copy)`,
      order: originalBoard.order + 1,
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await duplicatedBoard.save();
  }

  static async addColumn(boardId: string, columnData: any): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    board.columns.push(columnData);
    await board.save();
    return board;
  }

  static async updateColumn(boardId: string, columnId: string, columnData: any): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    const column = board.columns.find((col: any) => col.id === columnId);
    if (column) {
      Object.assign(column, columnData);
      await board.save();
    }
    return board;
  }

  static async removeColumn(boardId: string, columnId: string): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    board.columns = board.columns.filter((col: any) => col.id !== columnId);
    await board.save();
    return board;
  }

  static async addRow(boardId: string, rowData: any): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    board.rows.push(rowData);
    await board.save();
    return board;
  }

  static async updateRow(boardId: string, rowId: string, rowData: any): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    const row = board.rows.find((r: any) => r.id === rowId);
    if (row) {
      Object.assign(row, rowData);
      await board.save();
    }
    return board;
  }

  static async removeRow(boardId: string, rowId: string): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    board.rows = board.rows.filter((r: any) => r.id !== rowId);
    await board.save();
    return board;
  }

  static async addRelation(boardId: string, relationData: any): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    board.relations.push(relationData);
    await board.save();
    return board;
  }

  static async addAutomation(boardId: string, automationId: string): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    if (!board.automations.includes(automationId as any)) {
      board.automations.push(automationId as any);
      await board.save();
    }
    return board;
  }

  static async removeAutomation(boardId: string, automationId: string): Promise<IBoard | null> {
    const board = await Board.findById(boardId);
    if (!board) return null;
    board.automations = board.automations.filter((id: any) => id.toString() !== automationId);
    await board.save();
    return board;
  }
}
