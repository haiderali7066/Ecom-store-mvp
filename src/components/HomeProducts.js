"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function HomeProducts() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        // 👇 Filter only featured products
        const featuredProducts = data.filter((p) => p.featured === true);
        setFeatured(featuredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="relative rounded-2xl overflow-hidden h-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_1.5s_infinite]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shine_1.2s_infinite]" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {featured?.slice(0, 8).map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
