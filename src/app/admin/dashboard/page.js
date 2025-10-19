"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    featured: false,
  });

  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
    if (activeTab === "products") fetchProducts();
  }, [activeTab]);

  // 🧾 Fetch Orders
  async function fetchOrders() {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setOrders(Array.isArray(json) ? json : json.orders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  }

  // 🛍 Fetch Products
  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  // 🗑 Delete Product
  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Product deleted!");
        fetchProducts();
      } else {
        alert("❌ Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  }

  // ➕ Add Product
  async function addProduct(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Product added successfully!");
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "",
          featured: false,
        });
        fetchProducts();
      } else {
        alert(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {["orders", "products", "add"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md capitalize ${
              activeTab === tab ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
          >
            {tab === "add" ? "Add Product" : tab}
          </button>
        ))}
      </div>

      {/* Orders */}
      {activeTab === "orders" && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o._id} className="border-t">
                    <td className="p-3 font-mono text-xs">
                      {o._id?.slice(-8)}
                    </td>
                    <td className="p-3">{o.name || o.user?.name || "N/A"}</td>
                    <td className="p-3">
                      {o.products?.map((p, i) => (
                        <div key={i}>
                          {p.product?.name} × {p.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="p-3">PKR {o.total}</td>
                    <td className="p-3">{o.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Products List */}
      {activeTab === "products" && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Category</th>
                <th className="p-3">Featured</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-md text-xs text-gray-500">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-semibold">{p.name}</td>
                  <td className="p-3">PKR {p.price}</td>
                  <td className="p-3">{p.category || "—"}</td>
                  <td className="p-3">{p.featured ? "✅" : "❌"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product */}
      {activeTab === "add" && (
        <form
          onSubmit={addProduct}
          className="bg-white rounded-2xl shadow p-6 max-w-lg space-y-4"
        >
          <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
          <input
            placeholder="Product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="number"
            placeholder="Price (PKR)"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            placeholder="Category"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            className="w-full border px-3 py-2 rounded"
          />
          <input
            placeholder="Image URL"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.featured}
              onChange={(e) =>
                setProduct({ ...product, featured: e.target.checked })
              }
            />
            <span>Mark as Featured</span>
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>
      )}
    </section>
  );
}
