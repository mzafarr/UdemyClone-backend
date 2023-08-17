import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { userRouter } from "./routes/User";
import { CourseRouter } from "./routes/Course";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/User", userRouter);
app.use("/Course", CourseRouter);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE);

// Check if the connection was successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log("server is running on ", PORT);
});
