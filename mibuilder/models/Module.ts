import mongoose, { Schema, Document } from 'mongoose'
import { Field } from './Field'
import { View } from './View'

export interface IModule extends Document {
  name: string
  singularName: string
  description: string
  icon: string
  fields: any[]
  views: any[]
  settings: any
  workspaceId: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const moduleSchema = new Schema<IModule>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  singularName: {
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
    default: 'Package',
  },
  fields: [{
    type: Schema.Types.ObjectId,
    ref: 'Field',
  }],
  views: [{
    type: Schema.Types.ObjectId,
    ref: 'View',
  }],
  settings: {
    type: Schema.Types.Mixed,
    default: {},
  },
  workspaceId: {
    type: String,
    required: true,
    ref: 'Workspace',
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

export const Module = mongoose.models.Module || mongoose.model('Module', moduleSchema)

export class ModuleModel {
  static async create(moduleData: Omit<IModule, '_id' | 'createdAt' | 'updatedAt'>): Promise<IModule> {
    const newModule = new Module(moduleData);
    return await newModule.save();
  }

  static async findById(id: string): Promise<IModule | null> {
    return Module.findById(id);
  }

  static async findByWorkspace(workspaceId: string): Promise<IModule[]> {
    return Module.find({ workspaceId });
  }

  static async update(id: string, moduleData: Partial<IModule>): Promise<IModule | null> {
    return Module.findByIdAndUpdate(id, moduleData, { new: true });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await Module.findByIdAndDelete(id);
    return result !== null;
  }

  static async addField(moduleId: string, fieldData: any): Promise<IModule | null> {
    const module = await Module.findById(moduleId);
    if (!module) return null;
    module.fields.push(fieldData);
    await module.save();
    return module;
  }

  static async updateField(moduleId: string, fieldId: string, fieldData: any): Promise<IModule | null> {
    const module = await Module.findById(moduleId);
    if (!module) return null;
    const fieldIndex = module.fields.findIndex((field: any) => field._id.toString() === fieldId);
    if (fieldIndex > -1) {
      module.fields[fieldIndex] = fieldData;
      await module.save();
    }
    return module;
  }

  static async removeField(moduleId: string, fieldId: string): Promise<IModule | null> {
    const module = await Module.findById(moduleId);
    if (!module) return null;
    const fieldIndex = module.fields.findIndex((field: any) => field._id.toString() === fieldId);
    if (fieldIndex > -1) {
      module.fields.splice(fieldIndex, 1);
      await module.save();
    }
    return module;
  }

  static async addView(moduleId: string, viewData: any): Promise<IModule | null> {
    const module = await Module.findById(moduleId);
    if (!module) return null;
    module.views.push(viewData);
    await module.save();
    return module;
  }

  static async updateView(moduleId: string, viewId: string, viewData: any): Promise<IModule | null> {
    const module = await Module.findById(moduleId);
    if (!module) return null;
    const viewIndex = module.views.findIndex((view: any) => view._id.toString() === viewId);
    if (viewIndex > -1) {
      module.views[viewIndex] = viewData;
      await module.save();
    }
    return module;
  }

  static async removeView(moduleId: string, viewId: string): Promise<IModule | null> {
    const module = await Module.findById(moduleId);
    if (!module) return null;
    const viewIndex = module.views.findIndex((view: any) => view._id.toString() === viewId);
    if (viewIndex > -1) {
      module.views.splice(viewIndex, 1);
      await module.save();
    }
    return module;
  }
}
