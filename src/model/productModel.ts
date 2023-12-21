import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  _id?: string;
  name: string;
  slug: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  shippingPrice: number;
  previousPrice: number;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  rating: { type: Number, required: true, default: 0 },
  numReviews: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  previousPrice: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export const ProductModel = model<IProduct>('Product', ProductSchema);
