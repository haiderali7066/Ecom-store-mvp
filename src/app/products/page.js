"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: "no-store" });
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Filter when category in URL changes
  useEffect(() => {
    if (!categoryFromUrl || categoryFromUrl === "All") {
      setFiltered(products);
      setActiveCategory("All");
    } else {
      const filteredList = products.filter(
        (p) => p.category?.toLowerCase() === categoryFromUrl.toLowerCase()
      );
      setFiltered(filteredList);
      setActiveCategory(categoryFromUrl);
    }
  }, [categoryFromUrl, products]);

  const categories = ["All", "Muslim", "Trending", "Fanbase", "Motivational"];

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") setFiltered(products);
    else setFiltered(products.filter((p) => p.category === category));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Discover Our Collection
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterByCategory(cat)}
            className={`px-5 py-2 rounded-full border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-20">
          No products found in this category.
        </div>
      )}
    </section>
  );
}
