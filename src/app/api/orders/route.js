import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, phone, address, items, total } = body;

    if (!name || !phone || !address || !items?.length)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    // Convert cart items to product references
    const products = items.map((it) => ({
      product: it._id || it.product?._id || it.product,
      quantity: it.qty || it.quantity || 1,
    }));

    const order = await Order.create({
      name,
      phone,
      address,
      products,
      total,
      status: "Pending",
    });

    const populated = await Order.findById(order._id).populate(
      "products.product"
    );
    return NextResponse.json({ success: true, order: populated });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const orders = await Order.find()
    .populate("products.product")
    .sort({ createdAt: -1 });
  return NextResponse.json(orders);
}
