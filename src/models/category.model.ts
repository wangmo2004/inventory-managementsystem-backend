import { Schema, model, Document } from 'mongoose'
import {ICategory} from '../types/category'



const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: String,
});

export default model<ICategory>('Category', CategorySchema);
