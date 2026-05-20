import mongoose, { Schema, Document } from 'mongoose'

export interface IView extends Document {
  name: string
  type: 'table' | 'kanban' | 'calendar' | 'list' | 'gallery'
  settings: any
  moduleId: string
  createdAt: Date
  updatedAt: Date
}

const viewSchema = new Schema<IView>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['table', 'kanban', 'calendar', 'list', 'gallery'],
  },
  settings: {
    type: Schema.Types.Mixed,
    default: {},
  },
  moduleId: {
    type: String,
    required: true,
    ref: 'Module',
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

export const View = mongoose.models.View || mongoose.model('View', viewSchema)
export default View
