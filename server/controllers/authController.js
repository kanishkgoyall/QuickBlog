import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.json({ success: false, message: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ success: true, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ success: true, token });
};