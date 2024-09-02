import mongoose from "mongoose";

const connection: { isconnected?: number } = {};

async function dbConnect() {
  if (connection.isconnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI!);
    connection.isconnected = db.connections[0].readyState;
    console.info("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    return;
  }
}

export default dbConnect;
