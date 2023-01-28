import mongoose from "mongoose";
require('dotenv').config();
const uri: any = process.env.URI;
const options: any = { useNewUrlParser: true, useUnifiedTopology: true }
export const connectDB = async () => {
  await mongoose
    .connect(uri, { ...options })
}



