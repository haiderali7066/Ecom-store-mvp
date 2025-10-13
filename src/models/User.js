// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // "admin" or "user"
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
