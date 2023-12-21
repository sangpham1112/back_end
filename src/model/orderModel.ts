import { Schema, model, Document } from 'mongoose';
import {  IProduct } from './productModel';
import {  IUser } from './userModel';

interface IItem extends Document {
  name: string;
  quantity: string;
  image: string;
  price: number;
  product: IProduct['_id'] | IProduct;
}

interface IShippingAddress extends Document {
  fullName?: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
}

export interface IOrder extends Document {
  orderItems: IItem[];
  shippingAddress?: IShippingAddress;
  user?: IUser['_id'] | IUser;
  status?: string;
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  quantity: { type: String, require: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const ShippingAddressSchema = new Schema<IShippingAddress>({
  fullName: { type: String },
  address: { type: String },
  phone: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});

const OrderSchema = new Schema<IOrder>({
  orderItems: [ItemSchema],
  shippingAddress: ShippingAddressSchema,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, required: true, default: 'pending' },
  itemsPrice: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
}, { timestamps: true });

export const OrderModel = model<IOrder>('Order', OrderSchema);
