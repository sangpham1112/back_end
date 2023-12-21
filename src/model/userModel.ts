import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

export const UserModel = model<IUser>('User', UserSchema);
