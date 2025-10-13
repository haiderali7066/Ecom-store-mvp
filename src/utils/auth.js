// utils/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "change_this";

export function signToken(user) {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
  } catch (err) {
    return null;
  }
}

export async function getUserFromAuthHeader(authHeader) {
  if (!authHeader) return null;
  const payload = verifyToken(authHeader);
  if (!payload) return null;
  await import("../models/User"); // ensure model registered
  const user = await User.findById(payload.id).lean();
  return user;
}
