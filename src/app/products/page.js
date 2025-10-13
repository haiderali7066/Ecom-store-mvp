// app/products/page.js
import ProductCard from "../../components/ProductCard";
import { headers } from "next/headers";

async function getProducts() {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.map((p) => (
          <ProductCard product={p} key={p._id} />
        ))}
      </div>
    </section>
  );
}
