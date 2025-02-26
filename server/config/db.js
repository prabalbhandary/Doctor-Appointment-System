import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB);
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgGreen);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`.bgRed);
    }
};

export default connectDB;