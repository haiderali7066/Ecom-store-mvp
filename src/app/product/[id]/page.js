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
    <section className="px-6 md:px-12 py-10">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
        {/* 🖼 Product Image */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="h-[500px] bg-gray-100 flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {/* 🧾 Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            {product.category && (
              <p className="text-sm mt-2 inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                {product.category}
              </p>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description || "No description provided for this product."}
          </p>

          <div className="text-3xl font-extrabold text-gray-900">
            PKR {product.price}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href={`/checkout?product=${product._id}`}
              prefetch={false}
              className="px-6 py-3 rounded-xl bg-black text-white text-center font-semibold hover:bg-gray-800 transition"
            >
              Buy Now
            </Link>

            <AddToCartButton product={product} />
          </div>

          {/* Small info section */}
          <div className="pt-6 border-t text-sm text-gray-500 space-y-2">
            <p>✅ 100% Cotton Premium Fabric</p>
            <p>🚚 Free delivery on orders above PKR 3000</p>
            <p>💳 Cash on Delivery & Easypaisa/JazzCash accepted</p>
          </div>
        </div>
      </div>
    </section>
  );
}
