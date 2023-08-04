"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./routes/User");
const Course_1 = require("./routes/Course");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use("/User", User_1.userRouter);
app.use("/Course", Course_1.CourseRouter);
// Connect to MongoDB
mongoose_1.default.connect(process.env.DATABASE);
// Check if the connection was successful
mongoose_1.default.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
app.listen(process.env.PORT || 3001, () => {
    console.log("server is running");
});
