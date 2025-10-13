// app/page.js
import ProductCard from "@/components/ProductCard";

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <section className="p-8">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-bold">ShopNext — Modern Store</h1>
          <p className="mt-2 text-gray-600">
            Clean UI, simple flows — place orders without payments.
          </p>
        </div>
      </header>

      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}
