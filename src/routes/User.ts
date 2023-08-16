import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const router = express.Router();
import { UserModel } from "../models/User";

router.post("/signup", async (req, res) => {
  const { name, email, password, type } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "account with this email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
    type,
  });
  await newUser.save();
  return res.json({ message: "User registered successfully" });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "email or password is incorrect" });
  }
  const token = jwt.sign({ email: user.email }, "secret");
  return res.json({
    message: "Successfully signed in",
    token,
    email: user.email,
  });
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { router as userRouter, verifyToken };
