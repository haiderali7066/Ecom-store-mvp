"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  // Fetch orders
  useEffect(() => {
    if (activeTab === "orders") fetchOrders();
  }, [activeTab]);

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
      setOrders([]);
    }
  }

  async function updateStatus(id, status) {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  }

  // Add Product
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
        });
      } else {
        alert(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "orders" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "products" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          Add Product
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow">
          <table className="min-w-full">
            <thead className="text-left bg-gray-50">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o._id} className="border-t">
                    <td className="p-3 font-mono text-sm">
                      {o._id?.slice(-8)}
                    </td>
                    <td className="p-3">{o.name || o.user?.name || "N/A"}</td>
                    <td className="p-3">
                      {Array.isArray(o.products) && o.products.length > 0 ? (
                        o.products.map((p, index) => (
                          <div key={p.product?._id || `${o._id}-${index}`}>
                            {p.product?.name || "Unknown"} × {p.quantity}
                          </div>
                        ))
                      ) : (
                        <div>No items</div>
                      )}
                    </td>
                    <td className="p-3">PKR {o.total}</td>
                    <td className="p-3">{o.status}</td>
                    <td className="p-3">
                      <select
                        defaultValue={o.status}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                        className="p-1 border rounded"
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === "products" && (
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
