import { Schema, model } from 'mongoose';
import { IWarehouse } from '../types/warehouse'; 

const WarehouseSchema = new Schema<IWarehouse>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
});

export default model<IWarehouse>('Warehouse', WarehouseSchema);
