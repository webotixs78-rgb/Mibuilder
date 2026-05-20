import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkspace extends Document {
  name: string
  description: string
  owner: string
  members: string[]
  projects: string[]
  boards: string[]
  avatar: string
  isActive: boolean
  settings: {
    timezone: string
    dateFormat: string
    currency: string
  }
  createdAt: Date
  updatedAt: Date
}

const workspaceSchema = new Schema<IWorkspace>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
    ref: 'User',
  },
  members: [{
    type: String,
    ref: 'User',
  }],
  projects: [{
    type: String,
    ref: 'Module',
  }],
  boards: [{
    type: String,
    ref: 'Board',
  }],
  avatar: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  settings: {
    timezone: {
      type: String,
      default: 'UTC',
    },
    dateFormat: {
      type: String,
      default: 'MM/DD/YYYY',
    },
    currency: {
      type: String,
      default: 'USD',
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

export const Workspace = mongoose.models.Workspace || mongoose.model('Workspace', workspaceSchema)

export class WorkspaceModel {
  static async create(workspaceData: Omit<IWorkspace, '_id' | 'createdAt' | 'updatedAt'>): Promise<IWorkspace> {
    const newWorkspace = new Workspace(workspaceData);
    return await newWorkspace.save();
  }

  static async findById(id: string): Promise<IWorkspace | null> {
    return Workspace.findById(id);
  }

  static async findByOwner(ownerId: string): Promise<IWorkspace[]> {
    return Workspace.find({ owner: ownerId });
  }

  static async update(id: string, workspaceData: Partial<IWorkspace>): Promise<IWorkspace | null> {
    return Workspace.findByIdAndUpdate(id, workspaceData, { new: true });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await Workspace.findByIdAndDelete(id);
    return result !== null;
  }

  static async addMember(workspaceId: string, userId: string): Promise<boolean> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return false;
    if (!workspace.members.includes(userId)) {
      workspace.members.push(userId);
      await workspace.save();
    }
    return true;
  }

  static async removeMember(workspaceId: string, userId: string): Promise<boolean> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return false;
    const index = workspace.members.indexOf(userId);
    if (index > -1) {
      workspace.members.splice(index, 1);
      await workspace.save();
    }
    return true;
  }

  static async addBoard(workspaceId: string, boardId: string): Promise<boolean> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return false;
    if (!workspace.boards.includes(boardId)) {
      workspace.boards.push(boardId);
      await workspace.save();
    }
    return true;
  }

  static async removeBoard(workspaceId: string, boardId: string): Promise<boolean> {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return false;
    const index = workspace.boards.indexOf(boardId);
    if (index > -1) {
      workspace.boards.splice(index, 1);
      await workspace.save();
    }
    return true;
  }

  static async getBoards(workspaceId: string): Promise<string[]> {
    const workspace = await Workspace.findById(workspaceId);
    return workspace?.boards || [];
  }
}
