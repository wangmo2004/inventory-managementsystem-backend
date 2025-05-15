import { Schema, model, Document } from 'mongoose';
import {ISupplier} from '../types/supplier'

const SupplierSchema = new Schema<ISupplier>({
  name: String,
  contactInfo: String,
  address: String,
})

export default model<ISupplier>('Supplier', SupplierSchema)
