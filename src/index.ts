import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import { userRouter } from "./routes/User";
import { CourseRouter } from "./routes/Course";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(cookieParser());
app.use("/User", userRouter);
app.use("/Course", CourseRouter);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE);

// Check if the connection was successful
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.listen(process.env.PORT || 3001, () => {
  console.log("server is running");
});
