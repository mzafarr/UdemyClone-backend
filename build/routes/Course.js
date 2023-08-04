"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.CourseRouter = router;
const Course_1 = require("../models/Course");
const User_1 = require("../models/User");
router.post("/addcourse", async (req, res) => {
    const { name, id, instructor } = req.body;
    const course = new Course_1.CourseModel({ name, id, instructor });
    await course.save();
    //delete this:
    console.log("new CourseModel: ", course);
    res.json({ message: "Course is successfully added." });
});
router.put("/enrollcourse:id", async (req, res) => {
    const id = req.params.id;
    const { studentEmail } = req.body;
    const student = await User_1.UserModel.findOne({ studentEmail });
    const course = await Course_1.CourseModel.findOne({ id });
    if (!course || !student) {
        return res
            .status(400)
            .json({ message: "This course or student doesn't exist." });
    }
    //delete this:
    console.log("await CourseModel.findOne: ", course);
    student.updateOne({ $push: { courses: course } });
    course.updateOne({ $push: { students: student } });
    res.json({ message: "Course is successfully enrolled." });
});
router.put("/addcourse:id", async (req, res) => {
    const id = req.params.id;
    const { instructorEmail } = req.body;
    const instructor = await User_1.UserModel.findOne({ instructorEmail });
    const course = await Course_1.CourseModel.findOne({ id });
    //   if (instructor.type == "instructor")
    if (!course || !instructor) {
        return res
            .status(400)
            .json({ message: "This course or instructor doesn't exist." });
    }
    instructor.updateOne({ $push: { courses: course } });
    course.updateOne({ $push: { instructors: instructor } });
    res.json({ message: "Course is successfully added." });
});
