import mongoose, { Schema, Document } from 'mongoose'

export interface IField extends Document {
  name: string
  type: 'text' | 'number' | 'email' | 'phone' | 'date' | 'select' | 'checkbox' | 'textarea' | 'file' | 'relation'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  defaultValue?: any
  moduleId: string
  relationConfig?: {
    targetBoardId?: string
    targetColumnId?: string
    relationType?: 'one-to-one' | 'one-to-many' | 'many-to-many'
    allowMultiple?: boolean
    displayField?: string
  }
  createdAt: Date
  updatedAt: Date
}

const fieldSchema = new Schema<IField>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'email', 'phone', 'date', 'select', 'checkbox', 'textarea', 'file', 'relation'],
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  placeholder: {
    type: String,
    trim: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  options: [{
    type: String,
  }],
  defaultValue: {
    type: Schema.Types.Mixed,
  },
  relationConfig: {
    targetBoardId: {
      type: String,
      ref: 'Board',
    },
    targetColumnId: {
      type: String,
    },
    relationType: {
      type: String,
      enum: ['one-to-one', 'one-to-many', 'many-to-many'],
      default: 'one-to-many',
    },
    allowMultiple: {
      type: Boolean,
      default: false,
    },
    displayField: {
      type: String,
      default: 'name',
    },
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

export const Field = mongoose.models.Field || mongoose.model('Field', fieldSchema)
export default Field
