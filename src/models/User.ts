import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course', required: false }],
  type: {
    type: String,
    enum: ['student', 'instructor'],
    required: true
  },
});

export const UserModel = mongoose.model("User", UserSchema);
