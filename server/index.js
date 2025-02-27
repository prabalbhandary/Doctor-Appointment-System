import "colors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import morgan from "morgan";

//dotenv conig
dotenv.config();

//mongodb connection
connectDB();

//rest obejct
const app = express();

const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public/uploads"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

//port
const port = process.env.PORT || 5000;
const mode = process.env.NODE_MODE || "production";
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${mode} mode at http://localhost:${port}`
      .bgCyan.white
  );
});
