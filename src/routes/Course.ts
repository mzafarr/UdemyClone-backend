import { UserModel } from "./../models/User";
import express from "express";
const router = express.Router();
import { CourseModel } from "../models/Course";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

//create course
router.post("/createcourse", async (req, res) => {
  try {
    const { name, id, instructorEmail, category, videoLinks } = req.body;
    const instructor = await UserModel.findOne({ email: instructorEmail });
    if (!instructor) {
      return res
        .status(400)
        .json({ message: "This instructor doesn't exist." });
    }
    const course = new CourseModel({ name, id, instructor, category, videos: videoLinks });

    await course.save();
    await instructor.updateOne({ $push: { courses: course } });

    return res.json({ message: "Course is successfully created." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// enroll course for student
router.put("/enrollcourse:id", async (req, res) => {
  const id = req.params.id;
  const { studentEmail } = req.body;
  const student = await UserModel.findOne({ email: studentEmail });
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

// Add a new course for instructor
router.put("/addcourse/:id", async (req, res) => {
  const id = req.params.id;
  const { instructorEmail } = req.body;
  const instructor = await UserModel.findOne({ email: instructorEmail });
  const course = await CourseModel.findOne({ _id: id });

  if (!course || !instructor) {
    return res
      .status(400)
      .json({ message: "This course or instructor doesn't exist." });
  }

  if (course.instructor === instructor._id) {
    return res.status(400).json({ message: "Course is already added." });
  }

  instructor.updateOne({ $push: { courses: course } });
  course.updateOne({ $push: { instructors: instructor } });
  return res.json({ message: "Course is successfully added." });
});

// view course, and authentication for viewing it
router.get("course/:id", async (req, res) => {
  const courseId = req.params.id;
  const { userEmail } = req.body;
  const student = await UserModel.findOne({ email: userEmail });
  if (!student) {
    return res.json({ authorized: false });
  }
  const studentEnrolled: boolean = !!student.courses.find(
    (course) => course._id.toString() === courseId.toString()
  );
  if (studentEnrolled) return res.json({ authorized: true });
  else return res.json({ authorized: false });
});

//show current user's courses
router.get("/courses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userIdAsObjectId = new ObjectId(userId);

    // Query for courses where the student ID matches
    const courses = await CourseModel.find({ students: userIdAsObjectId });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//show courses based on search query
router.get("/searchCourses", async (req, res) => {
  try {
    let searchTerm = req.query.term; // Get the search term from the query parameter
    searchTerm = typeof searchTerm === "string" ? searchTerm : "";

    const courses = await CourseModel.find({
      $text: { $search: searchTerm }, // Use MongoDB's text search feature
    });

    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//show courses based on selected category
router.get("/courses/:category", async (req, res) => {
  try {
    let category = req.query.category;
    const courses = await CourseModel.find({ category });
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as CourseRouter };
