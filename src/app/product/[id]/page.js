// app/product/[id]/page.js
import Link from "next/link";
import { headers } from "next/headers";
import AddToCartButton from "@/components/AddToCartButton";

async function getProduct(id) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/products?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return (
    <section className="p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-white rounded-2xl p-6 shadow">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          ) : (
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-3 text-gray-600">{product.description}</p>
          <div className="mt-4 text-2xl font-bold">PKR {product.price}</div>

          <div className="mt-6 flex gap-3">
            <Link
              href={`/checkout?product=${product._id}`}
              prefetch={false}
              className="px-4 py-2 rounded-md bg-green-600 text-white"
            >
              Buy Now
            </Link>

            {/* ✅ Client-side Add to Cart */}
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
