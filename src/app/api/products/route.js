import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { getUserFromAuthHeader } from "@/utils/auth";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const product = await Product.findById(id).lean();
    return NextResponse.json(product || {});
  }

  const products = await Product.find().limit(100).lean();
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  try {
    const user = await getUserFromAuthHeader(req.headers.get("authorization"));
    if (!user || user.role !== "admin")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, description, price, category, image } = body;

    if (!name || !price)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
