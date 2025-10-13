"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Decode token to verify admin role (optional client check)
      const payload = JSON.parse(atob(data.token.split(".")[1]));
      if (payload.role !== "admin") {
        throw new Error("Access denied: Not an admin");
      }

      // ✅ Redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Error logging in");
    }
  };

  return (
    <section className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        No account?{" "}
        <a href="/admin/signup" className="text-blue-600 hover:underline">
          Create one
        </a>
      </p>
    </section>
  );
}
