import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password?: string
  name: string
  company?: string
  role: 'owner' | 'admin' | 'member'
  avatar?: string
  isActive: boolean
  provider: 'local' | 'google' | 'facebook'
  providerId?: string
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['owner', 'admin', 'member'],
    default: 'member',
  },
  avatar: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  provider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local',
  },
  providerId: {
    type: String,
    sparse: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
  },
}, {
  timestamps: true,
})

// Hash password before saving
userSchema.pre('save', async function(next: any) {
  if (!this.isModified('password') || !this.password) return next()
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error: any) {
    return next(error)
  }
})

// Method to verify password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// Method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLoginAt = new Date()
  return this.save()
}

// Method to get user without password
userSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  return user
}

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
