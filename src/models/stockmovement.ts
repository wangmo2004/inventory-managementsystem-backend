import { Schema, model } from 'mongoose';
import { IStockMovement } from '../types/stockmovement';

const StockMovementSchema = new Schema<IStockMovement>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  source: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  destination: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default model<IStockMovement>('StockMovement', StockMovementSchema);
