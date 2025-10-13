// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/auth";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { name, email, password } = body;
  if (!email || !password)
    return NextResponse.json({ error: "Missing" }, { status: 400 });
  const exists = await User.findOne({ email });
  if (exists)
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  const token = signToken(user);
  return NextResponse.json({
    token,
    user: { id: user._id, email: user.email, name: user.name, role: user.role },
  });
}
