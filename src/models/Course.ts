import mongoose, { Schema } from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
  instructor: { type: Schema.Types.ObjectId, ref: 'Instructor', required: true },
  
});

export const CourseModel = mongoose.model("Course", CourseSchema);
