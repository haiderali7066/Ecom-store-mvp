// app/api/product/[id]/route.js
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  await connectDB();
  const prod = await Product.findById(params.id).lean();
  if (!prod) {
    return new Response(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }
  return new Response(JSON.stringify(prod), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
