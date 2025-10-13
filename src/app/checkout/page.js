"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Load cart or fetch single product
  useEffect(() => {
    async function loadData() {
      setMounted(true);

      if (productId) {
        // if productId exists in URL, fetch that product
        const res = await fetch(`/api/products?id=${productId}`);
        const data = await res.json();

        if (data && data._id) {
          const item = { ...data, qty: 1 };
          setCart([item]);
          setTotal(item.price);
        } else {
          alert("Product not found");
        }
      } else {
        // otherwise, load full cart from localStorage
        const raw = localStorage.getItem("cart");
        const parsed = raw ? JSON.parse(raw) : [];
        setCart(parsed);
        const sum = parsed.reduce((acc, i) => acc + i.price * (i.qty || 1), 0);
        setTotal(sum);
      }
    }

    loadData();
  }, [productId]);

  if (!mounted) return null;

  async function placeOrder(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address)
      return alert("Please fill all fields");

    if (!cart.length) return alert("No items to order");

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          items: cart,
          total,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.removeItem("cart");
        router.push("/order-success");
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (err) {
      console.error(err);
      alert("Error placing order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout — Cash on Delivery</h1>

      <form onSubmit={placeOrder} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <p className="font-semibold">Total: PKR {total.toLocaleString()}</p>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
        >
          {loading ? "Placing..." : "Place Order (COD)"}
        </button>
      </form>
    </section>
  );
}
