// app/cart/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("cart");
    setCart(raw ? JSON.parse(raw) : []);
  }, []);

  function updateQty(id, qty) {
    const next = cart.map((it) => (it._id === id ? { ...it, qty } : it));
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function removeItem(id) {
    const next = cart.filter((c) => c._id !== id);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.length === 0 && (
          <div>
            <p>Your cart is empty.</p>
            <Link href="/products" className="text-blue-600 underline">
              Continue shopping
            </Link>
          </div>
        )}

        {cart.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded shadow flex items-center gap-4"
          >
            <img
              src={item.image || "/product-images/placeholder.png"}
              alt={item.name}
              className="w-24 h-24 object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p>PKR {item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={item.qty || 1}
                onChange={(e) => updateQty(item._id, Number(e.target.value))}
                className="w-16 border rounded px-2 py-1"
              />
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Total: PKR {total}</p>
            <p className="text-sm text-gray-600">
              Cash on Delivery available at checkout
            </p>
          </div>
          <Link
            href="/checkout"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Checkout (COD)
          </Link>
        </div>
      )}
    </section>
  );
}
