"use client";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const raw = localStorage.getItem("cart");
    const cart = raw ? JSON.parse(raw) : [];

    const existing = cart.find((p) => p._id === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);

    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={addToCart}
      className={`px-4 py-2 rounded-md border transition ${
        added ? "bg-green-600 text-white" : "hover:bg-gray-100"
      }`}
    >
      {added ? "Added!" : "Add to Cart"}
    </button>
  );
}
