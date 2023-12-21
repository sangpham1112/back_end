import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();


async function connectDB() {
  const MONGODB_URI = 'mongodb+srv://sangthanh97:GQCgL4MUtoEmsiKH@cluster0.ffqyzgb.mongodb.net/shopping?retryWrites=true&w=majority'
    mongoose.set('strictQuery', true)
    mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log(MONGODB_URI);
  })
}

export default connectDB