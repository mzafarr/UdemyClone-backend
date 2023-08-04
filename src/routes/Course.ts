import express from "express";
const router = express.Router();
import { CourseModel } from "../models/Course";
import { UserModel } from "../models/User";

router.post("/addcourse", async (req, res) => {
  const { name, id, instructor } = req.body;
  const course = new CourseModel({ name, id, instructor });
  await course.save();

  return res.json({ message: "Course is successfully added." });
});

router.put("/enrollcourse:id", async (req, res) => {
  const id = req.params.id;
  const { studentEmail } = req.body;
  const student = await UserModel.findOne({ studentEmail });
  const course = await CourseModel.findOne({ _id: id });

  if (!course || !student) {
    return res
      .status(400)
      .json({ message: "This course or student doesn't exist." });
  }
  if (course.students.includes(student._id)) {
    return res
      .status(400)
      .json({ message: "Student already enrolled in this course." });
  }

  student.updateOne({ $push: { courses: course } });
  course.updateOne({ $push: { students: student } });
  return res.json({ message: "Course is successfully enrolled." });
});

router.put("/addcourse:id", async (req, res) => {
  const id = req.params.id;
  const { instructorEmail } = req.body;
  const instructor = await UserModel.findOne({ instructorEmail });
  const course = await CourseModel.findOne({ _id: id });
  //   if (instructor.type == "instructor")
  if (!course || !instructor) {
    return res
      .status(400)
      .json({ message: "This course or instructor doesn't exist." });
  }

  if (course.instructor === instructor._id) {
    return res
      .status(400)
      .json({ message: "Course is already added." });
  }

  instructor.updateOne({ $push: { courses: course } });
  course.updateOne({ $push: { instructors: instructor } });
  return res.json({ message: "Course is successfully added." });
});

export { router as CourseRouter };
