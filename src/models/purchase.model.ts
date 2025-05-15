import { Schema, model, Document, Types } from 'mongoose'
import {IPurchase} from '../types/purchase'



const PurchaseSchema = new Schema<IPurchase>({
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  date: { type: Date, default: Date.now },
  totalAmount: Number,
  status: { type: String, enum: ['pending', 'received', 'cancelled'], default: 'pending' },
});

export default model<IPurchase>('Purchase', PurchaseSchema);
