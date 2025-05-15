import { Schema, model } from 'mongoose';
import { IStock } from '../types/stock';

const StockSchema = new Schema<IStock>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  warehouse: {
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
  }
});

export default model<IStock>('Stock', StockSchema);
