import { Schema, model, Document } from 'mongoose';

export interface IComment extends Document {
  _id?: string;
  username: string;
  slug: string;
  text: string;
  rating: number;
}

const CommentSchema = new Schema<IComment>({
  username: { type: String, required: true },
  slug: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
}, { timestamps: true });

export const CommentModel = model<IComment>('Comment', CommentSchema);
