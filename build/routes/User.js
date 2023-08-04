"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
exports.userRouter = router;
const User_1 = require("../models/User");
router.post("/signup", async (req, res) => {
    const { name, email, password, type } = req.body;
    const user = await User_1.UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "account with this email already exists" });
    }
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const newUser = new User_1.UserModel({ name, email, password: hashedPassword, type });
    await newUser.save();
    res.json({ message: "User registered successfully" });
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.UserModel.findOne({ email });
    if (!user) {
        return res
            .status(400)
            .json({ message: "email or password is incorrect" });
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res
            .status(400)
            .json({ message: "email or password is incorrect" });
    }
    const token = jsonwebtoken_1.default.sign({ email: user.email }, "secret");
    res.json({ token, email: user.email });
});
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jsonwebtoken_1.default.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.verifyToken = verifyToken;
