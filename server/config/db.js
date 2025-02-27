import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

export default connectDB;
