import { Schema, model, Document } from 'mongoose'
import { IUser } from '../types/inventory'

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'manager', 'staff'], required: true },
  passwordHash: { type: String, required: true },
})

export default model<IUser>('User', UserSchema)
