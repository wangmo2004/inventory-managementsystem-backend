import { Schema, model, Document, Types } from 'mongoose';
import {ISaleItem} from '../types/saleitem'


const SaleItemSchema = new Schema<ISaleItem>({
  sale: { type: Schema.Types.ObjectId, ref: 'Sale' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  price: Number,
});

export default model<ISaleItem>('SaleItem', SaleItemSchema);
